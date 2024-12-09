import cron from "node-cron";
import nodemailer from "nodemailer";
import prismaClient from "../../prisma";
import path from "path";
import ejs from "ejs";

class StartMarketingPublicationScheduler {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP,
            },
        });
    }

    async execute() {
        try {
            const now = new Date();

            // Busca publicações que precisam ser iniciadas e não estão em processamento
            const publications = await prismaClient.marketingPublication.findMany({
                where: {
                    status: "Indisponivel",
                    publish_at_start: { lte: now },
                    is_processing: false, // Evitar processamento simultâneo
                },
            });

            if (publications.length > 0) {
                for (const pub of publications) {
                    // Sinaliza início do processamento
                    await prismaClient.marketingPublication.update({
                        where: { id: pub.id },
                        data: { is_processing: true },
                    });

                    // Atualiza status e data de última atualização
                    await prismaClient.marketingPublication.update({
                        where: { id: pub.id },
                        data: {
                            status: "Disponivel",
                            is_processing: false, // Finaliza processamento
                        },
                    });
                    console.log(`Iniciada publicidade: ${pub.title}`);
                }
            }
        } catch (error) {
            console.error("Erro ao publicar publicações:", error);
        }
    }

    private async sendEmail(title: string) {
        try {
            const emailTemplatePath = path.join(__dirname, "../emails_transacionais/publicidade_programada.ejs");

            const htmlContent = await ejs.renderFile(emailTemplatePath, { title });

            await this.transporter.sendMail({
                from: "Blog Oficina Mecânica Online <contato.graxa@oficinamecanicaonline.com>",
                to: "contato.graxa@oficinamecanicaonline.com",
                subject: "Publicidade Programada Iniciada",
                html: htmlContent,
            });
        } catch (error) {
            console.error("Erro ao enviar email:", error);
        }
    }
}

const scheduler = new StartMarketingPublicationScheduler();
cron.schedule("*/3 * * * *", () => {
    scheduler.execute();
});

export { StartMarketingPublicationScheduler };