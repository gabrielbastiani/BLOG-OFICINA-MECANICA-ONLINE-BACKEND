import prismaClient from "../../prisma";

interface LikeRequest {
    post_id: string;
    userBlog_id: string;
    isLike: boolean;
}

class PostLikeService {
    async execute({ post_id, userBlog_id, isLike }: LikeRequest) {

        const existingLike = await prismaClient.postLike.findUnique({
            where: {
                post_id_userBlog_id: {
                    post_id,
                    userBlog_id,
                },
            },
        });

        if (existingLike) {
            if (existingLike.isLike === isLike) {
                return { message: "Você já registrou esta interação e ela não pode ser repetida." };
            }

            await prismaClient.postLike.update({
                where: { id: existingLike.id },
                data: { isLike },
            });

            if (isLike) {
                await prismaClient.post.update({
                    where: { id: post_id },
                    data: {
                        post_like: { increment: 1 },
                        post_dislike: { decrement: 1 },
                    },
                });
            } else {
                await prismaClient.post.update({
                    where: { id: post_id },
                    data: {
                        post_like: { decrement: 1 },
                        post_dislike: { increment: 1 },
                    },
                });
            }

            return { message: "Interação atualizada com sucesso." };
        } else {
            await prismaClient.postLike.create({
                data: {
                    post_id,
                    userBlog_id,
                    isLike,
                },
            });

            if (isLike) {
                await prismaClient.post.update({
                    where: { id: post_id },
                    data: { post_like: { increment: 1 } },
                });
            } else {
                await prismaClient.post.update({
                    where: { id: post_id },
                    data: { post_dislike: { increment: 1 } },
                });
            }

            return { message: "Interação registrada com sucesso." };
        }
    }
}

export { PostLikeService };