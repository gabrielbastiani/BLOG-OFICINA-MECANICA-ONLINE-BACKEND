import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";

interface CommentRequest {
    post_id: string;
    userBlog_id: string;
    comment: string;
    parentId?: string;
    nivel?: number;
}

class CommentCreateService {
    async execute({ post_id, userBlog_id, comment, parentId }: CommentRequest) {
        if (!post_id || !userBlog_id || !comment) {
            throw new Error("Campos obrigatórios ausentes: post_id, userBlog_id ou comment.");
        }

        let computedNivel = 0;
        if (parentId) {
            const parentComment = await prismaClient.comment.findUnique({
                where: { id: parentId },
            });

            if (!parentComment) {
                throw new Error("Comentário pai não encontrado.");
            }

            computedNivel = (parentComment.nivel || 0) + 1;
        }

        const comment_create = await prismaClient.comment.create({
            data: {
                post_id,
                userBlog_id,
                comment,
                parentId,
                nivel: computedNivel,
            },
        });

        const [users_superAdmins, users_admins, blog_user, blog_post] = await Promise.all([
            prismaClient.user.findMany({ where: { role: RoleUser.SUPER_ADMIN } }),
            prismaClient.user.findMany({ where: { role: RoleUser.ADMIN } }),
            prismaClient.userBlog.findUnique({ where: { id: userBlog_id } }),
            prismaClient.post.findUnique({ where: { id: post_id } }),
        ]);

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id),
        ];

        const message = `${blog_user?.name || "Um usuário"} deixou seu comentário no post ${blog_post?.title || "desconhecido"}.`;

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message,
            type: "comment",
        }));

        await prismaClient.notificationUser.createMany({ data: notificationsData });

        return comment_create;
    }
}

export { CommentCreateService }