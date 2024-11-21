import cron from "node-cron";
import prismaClient from "../../prisma";

class PostPublishScheduler {
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

                await prismaClient.post.updateMany({
                    where: { id: { in: postIds } },
                    data: { status: "Disponivel" },
                });

                console.log(`${postsToPublish.length} posts publicados automaticamente.`);
            }
        } catch (error) {
            console.error("Erro ao publicar posts programados:", error);
        }
    }
}

const scheduler = new PostPublishScheduler();
cron.schedule("*/1 * * * *", () => {
    console.log("Verificando posts programados...");
    scheduler.execute();
});

export { PostPublishScheduler };