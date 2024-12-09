import cron from "node-cron";
import nodemailer from "nodemailer";
import prismaClient from "../../prisma";
import path from "path";
import ejs from "ejs";

class EndMarketingPublicationScheduler {
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

            const publications = await prismaClient.marketingPublication.findMany({
                where: {
                    status: "Disponivel",
                    publish_at_end: { lte: now },
                    OR: [{ last_status_update: null }, { last_status_update: { lt: now } }],
                },
            });

            if (publications.length > 0) {
                const publicationIds = publications.map((pub) => pub.id);

                await prismaClient.marketingPublication.updateMany({
                    where: { id: { in: publicationIds } },
                    data: {
                        status: "Indisponivel",
                        last_status_update: now,
                        email_sent: true,
                    },
                });

                for (const publication of publications) {
                    await this.sendEmail(publication.title);
                }
            }
        } catch (error) {
            console.error("Erro ao encerrar publicações:", error.message);
            if (error.code === "P1001") {
                console.error("Erro de conexão com o banco de dados. Verifique o servidor.");
            }
        }
    }

    private async sendEmail(title: string) {
        try {
            const emailTemplatePath = path.join(__dirname, "../emails_transacionais/encerrar_publicidade_programada.ejs");

            const htmlContent = await ejs.renderFile(emailTemplatePath, { title });

            await this.transporter.sendMail({
                from: "Blog Oficina Mecânica Online <contato.graxa@oficinamecanicaonline.com>",
                to: "contato.graxa@oficinamecanicaonline.com",
                subject: "Publicidade Programada Encerrada",
                html: htmlContent,
            });
        } catch (error) {
            console.error("Erro ao enviar email:", error);
        }
    }
}

const scheduler = new EndMarketingPublicationScheduler();
cron.schedule("1-59/5 * * * *", () => {
    scheduler.execute();
});

export { EndMarketingPublicationScheduler };