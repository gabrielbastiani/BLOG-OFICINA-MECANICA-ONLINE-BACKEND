import prismaClient from "../../prisma";

interface NewsRequest {
    id_delete: string[];
}

class NewsletterDeleteService {
    async execute({ id_delete }: NewsRequest) {

        const form = await prismaClient.newsletter.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        return form;

    }
}

export { NewsletterDeleteService }