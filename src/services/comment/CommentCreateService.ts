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
    async execute({ post_id, userBlog_id, comment, parentId, nivel }: CommentRequest) {

        const comment_create = await prismaClient.comment.create({
            data: {
                post_id: post_id,
                userBlog_id: userBlog_id,
                comment: comment,
                parentId: parentId,
                nivel: Number(nivel)
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

        const blog_user = await prismaClient.userBlog.findUnique({
            where: {
                id: userBlog_id
            }
        });

        const blog_post = await prismaClient.post.findUnique({
            where: {
                id: post_id
            }
        });

        const notificationsData = all_user_ids.map(user_id => ({
            userBlog_id,
            user_id,
            message: `${blog_user.name} deixou seu comentario no post ${blog_post.title}.`,
            type: "comment"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        return comment_create;

    }
}

export { CommentCreateService }