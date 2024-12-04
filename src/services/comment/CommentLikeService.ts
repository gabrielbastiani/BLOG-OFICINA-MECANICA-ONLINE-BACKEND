import prismaClient from "../../prisma";

interface LikeRequest {
    comment_id: string;
    userBlog_id: string;
    isLike: boolean;
}

class CommentLikeService {
    async execute({ comment_id, userBlog_id, isLike }: LikeRequest) {

        const existingLike = await prismaClient.commentLike.findUnique({
            where: {
                comment_id_userBlog_id: {
                    comment_id,
                    userBlog_id,
                },
            },
        });

        if (existingLike) {
            if (existingLike.isLike === isLike) {
                return { message: "Você já registrou esta interação e ela não pode ser repetida." };
            }

            await prismaClient.commentLike.update({
                where: { id: existingLike.id },
                data: { isLike },
            });

            if (isLike) {
                await prismaClient.comment.update({
                    where: { id: comment_id },
                    data: {
                        comment_like: { increment: 1 },
                        comment_dislike: { decrement: 1 },
                    },
                });
            } else {
                await prismaClient.comment.update({
                    where: { id: comment_id },
                    data: {
                        comment_like: { decrement: 1 },
                        comment_dislike: { increment: 1 },
                    },
                });
            }

            return { message: "Interação atualizada com sucesso." };
        } else {
            await prismaClient.commentLike.create({
                data: {
                    comment_id,
                    userBlog_id,
                    isLike,
                },
            });

            if (isLike) {
                await prismaClient.comment.update({
                    where: { id: comment_id },
                    data: { comment_like: { increment: 1 } },
                });
            } else {
                await prismaClient.comment.update({
                    where: { id: comment_id },
                    data: { comment_dislike: { increment: 1 } },
                });
            }

            return { message: "Interação registrada com sucesso." };
        }
    }
}

export { CommentLikeService };