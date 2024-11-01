import { RoleUser } from "@prisma/client";
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

        const users_superAdmins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        const users_admins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.ADMIN
            }
        });

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: "Novo newslatter cadastrado",
            type: "newsletter"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        return comment_create;

    }
}

export { NewsletterCreateService }