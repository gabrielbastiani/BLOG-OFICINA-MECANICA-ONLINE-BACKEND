import prismaClient from "../../prisma";
import { Request } from "express";
import { getClientIp } from "../../middlewares/getClientIp";

function normalizeIp(ip: string): string {
    if (ip === '::1') {
        return '127.0.0.1'; // Normaliza o localhost IPv6 para IPv4
    }
    return ip;
}

interface LikeRequest {
    post_id: string;
    isLike: boolean;
    req: Request;
}

class PostLikeService {
    async execute({ post_id, req, isLike }: LikeRequest) {

        const ipAddress = normalizeIp(getClientIp(req));

        const existingLike = await prismaClient.postLike.findFirst({
            where: {
                post_id,
                ipAddress: ipAddress
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
                    ipAddress,
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