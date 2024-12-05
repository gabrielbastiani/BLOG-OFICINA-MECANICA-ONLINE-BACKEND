import cron from "node-cron";
import nodemailer from "nodemailer";
import prismaClient from "../../prisma";
import path from "path";
import ejs from "ejs";

class PostPublishScheduler {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });
    }

    async execute() {
        try {
            const now = new Date();

            const postsToPublish = await prismaClient.post.findMany({
                where: {
                    status: "Indisponivel",
                    publish_at: { lte: now },
                },
            });

            if (postsToPublish.length > 0) {
                const postIds = postsToPublish.map((post) => post.id);

                // Atualiza os posts para "Disponível"
                await prismaClient.post.updateMany({
                    where: { id: { in: postIds } },
                    data: { status: "Disponivel" },
                });

                // Envia e-mails para cada post publicado
                for (const post of postsToPublish) {
                    await this.sendEmail(post.title);
                }
            }
        } catch (error) {
            console.error("Erro ao publicar posts programados:", error);
        }
    }

    private async sendEmail(postTitle: string) {
        try {
            const requiredPath = path.join(__dirname, `../emails_transacionais/post_programado.ejs`);

            const data = await ejs.renderFile(requiredPath, {
                title: postTitle
            });

            await this.transporter.sendMail({
                from: `Blog oficina mecânica online <contato.graxa@oficinamecanicaonline.com>`,
                to: "contato.graxa@oficinamecanicaonline.com",
                subject: `Post programado publicado no blog da Oficina mecânica online`,
                html: data
            });
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
        }
    }
}

const scheduler = new PostPublishScheduler();
cron.schedule("*/1 * * * *", () => {
    scheduler.execute();
});

export { PostPublishScheduler };