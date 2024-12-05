import { Request } from "express";
import prismaClient from "../../prisma";
import { getClientIp } from "../../middlewares/getClientIp";

function normalizeIp(ip: string): string {
    if (ip === '::1') {
        return '127.0.0.1'; // Normaliza o localhost IPv6 para IPv4
    }
    return ip;
}

class UpdateViewsService {
    async execute({ post_id, req }: { post_id: string; req: Request }) {
        const ipAddress = normalizeIp(getClientIp(req));

        const existingView = await prismaClient.postView.findFirst({
            where: {
                post_id,
                ipAddress: ipAddress,
            },
        });

        if (existingView) {
            return { message: "View already counted" };
        }

        await prismaClient.postView.create({
            data: {
                post_id,
                ipAddress: ipAddress,
            },
        });

        await prismaClient.post.update({
            where: { id: post_id },
            data: { views: { increment: 1 } },
        });

        return { message: "View successfully counted" };
    }
}

export { UpdateViewsService };