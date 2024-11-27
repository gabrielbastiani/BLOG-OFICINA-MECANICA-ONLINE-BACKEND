import prismaClient from "../../prisma";

interface LikeRequest {
    comment_id: string;
    userBlog_id: string;
    isLike: boolean; // true para like, false para dislike
}

class CommentLikeService {
    async execute({ comment_id, userBlog_id, isLike }: LikeRequest) {
        // Verificar se o usuário já interagiu com o comentário
        const existingLike = await prismaClient.commentLike.findUnique({
            where: {
                comment_id_userBlog_id: {
                    comment_id,
                    userBlog_id,
                },
            },
        });

        if (existingLike) {
            // Atualizar a interação existente
            if (existingLike.isLike === isLike) {
                // Se a interação é igual, remove o like/dislike
                await prismaClient.commentLike.delete({
                    where: {
                        id: existingLike.id,
                    },
                });

                // Reverter o contador de likes/dislikes
                const adjustment = isLike ? -1 : 1;
                await prismaClient.comment.update({
                    where: { id: comment_id },
                    data: { comment_like: { increment: adjustment } },
                });

                return { message: "Like/Dislike removido com sucesso." };
            } else {
                // Atualizar para a nova interação (de like para dislike, ou vice-versa)
                await prismaClient.commentLike.update({
                    where: { id: existingLike.id },
                    data: { isLike },
                });

                const adjustment = isLike ? 2 : -2; // Remove um e adiciona outro
                await prismaClient.comment.update({
                    where: { id: comment_id },
                    data: { comment_like: { increment: adjustment } },
                });

                return { message: "Interação atualizada com sucesso." };
            }
        } else {
            // Criar nova interação
            await prismaClient.commentLike.create({
                data: {
                    comment_id,
                    userBlog_id,
                    isLike,
                },
            });

            // Ajustar o contador no comentário
            const adjustment = isLike ? 1 : -1;
            await prismaClient.comment.update({
                where: { id: comment_id },
                data: { comment_like: { increment: adjustment } },
            });

            return { message: "Like/Dislike registrado com sucesso." };
        }
    }
}

export { CommentLikeService };