import prismaClient from "../../prisma";

interface NewsRrequest {
    name_user: string;
    email_user: string;
}

class NewsletterCreateService {
    async execute({ name_user, email_user }: NewsRrequest) {
        const comment_create = await prismaClient.newsletter.create({
            data: {
                name_user: name_user,
                email_user: email_user
            }
        });

        return comment_create;

    }
}

export { NewsletterCreateService }