import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";

interface PostRequest {
    author: string;
    title: string;
    image_post?: string;
    text_post: string;
    tags?: string[];
}

class PostCreateService {
    async execute({ author, title, image_post, text_post, tags }: PostRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const post = await prismaClient.post.create({
            data: {
                author: author,
                title: title,
                slug_title_post: removerAcentos(title),
                image_post: image_post,
                text_post: text_post,
                tags: tags
            }
        });

        const post_create = await prismaClient.post.findFirst();

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
            message: `Post de titulo ${post_create.title} criado.`,
            type: "post"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        return post;

    }
}

export { PostCreateService }