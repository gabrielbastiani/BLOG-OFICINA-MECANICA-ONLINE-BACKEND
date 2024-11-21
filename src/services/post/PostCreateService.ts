import { RoleUser, StatusPost } from "@prisma/client";
import prismaClient from "../../prisma";

interface PostRequest {
    author: string;
    title: string;
    image_post?: string;
    text_post: string;
    status: string;
    publish_at?: Date;
    tags?: string[];
    categories?: string[];
}

class PostCreateService {
    async execute({ author, title, image_post, text_post, status, publish_at, tags, categories }: PostRequest) {
        function removerAcentos(s: string): string {
            return s
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const statusEnum = Object.values(StatusPost).includes(status as StatusPost)
            ? (status as StatusPost)
            : StatusPost.Disponivel;

        const post = await prismaClient.post.create({
            data: {
                author,
                title,
                slug_title_post: removerAcentos(title),
                image_post,
                text_post,
                status: statusEnum,
                publish_at,
            },
        });

        if (categories && categories.length > 0) {
            await prismaClient.categoryOnPost.createMany({
                data: categories.map((category_id) => ({
                    post_id: post.id,
                    category_id,
                })),
            });
        }

        if (tags && tags.length > 0) {
            await prismaClient.tagOnPost.createMany({
                data: tags.map((tag_id) => ({
                    post_id: post.id,
                    tag_id,
                })),
            });
        }

        const users_superAdmins = await prismaClient.user.findMany({ where: { role: RoleUser.SUPER_ADMIN } });
        const users_admins = await prismaClient.user.findMany({ where: { role: RoleUser.ADMIN } });

        const all_user_ids = [
            ...users_superAdmins.map((user) => user.id),
            ...users_admins.map((user) => user.id),
        ];

        const notificationsData = all_user_ids.map((user_id) => ({
            user_id,
            message: `Post de título "${post.title}" foi criado.`,
            type: "post",
        }));

        await prismaClient.notificationUser.createMany({ data: notificationsData });

        return post;
    }
}

export { PostCreateService };