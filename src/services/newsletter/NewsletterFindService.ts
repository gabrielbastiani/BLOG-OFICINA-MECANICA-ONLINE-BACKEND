import prismaClient from "../../prisma";

interface NewsRequest {
    newsletter_id?: string;
}

class NewsletterFindService {
    async execute({ newsletter_id }: NewsRequest) {

        if (newsletter_id) {
            const letters = await prismaClient.newsletter.findUnique({
                where: {
                    id: newsletter_id
                }
            });

            return letters;
        }

        const news_all = await prismaClient.newsletter.findMany();

        return news_all;

    }
}

export { NewsletterFindService }