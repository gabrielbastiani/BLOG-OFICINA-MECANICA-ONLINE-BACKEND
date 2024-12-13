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
    comment_id: string;
    req: Request;
    isLike: boolean;
}

class CommentLikeService {
    async execute({ comment_id, req, isLike }: LikeRequest) {

        const ipAddress = normalizeIp(getClientIp(req));

        const existingLike = await prismaClient.commentLike.findFirst({
            where: {
                ipAddress: ipAddress,
                comment_id,
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
                    ipAddress,
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