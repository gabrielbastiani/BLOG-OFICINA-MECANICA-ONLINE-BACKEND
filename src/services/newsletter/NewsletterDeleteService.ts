import prismaClient from "../../prisma";

interface FormRequest {
    newsletter_id: string;
}

class NewsletterDeleteService {
    async execute({ newsletter_id }: FormRequest) {

        const form = await prismaClient.newsletter.delete({
            where: {
                id: newsletter_id
            }
        });

        return form;

    }
}

export { NewsletterDeleteService }