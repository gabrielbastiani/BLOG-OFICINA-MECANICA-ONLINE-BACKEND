import { Request } from "express";
import prismaClient from "../../prisma";
import { getClientIp } from "../../middlewares/getClientIp";

function normalizeIp(ip: string): string {
    if (ip === '::1') {
        return '127.0.0.1'; // Normaliza o localhost IPv6 para IPv4
    }
    return ip;
}

class UpdateViewsPuplicationsService {
    async execute({ marketingPublication_id, req }: { marketingPublication_id: string; req: Request }) {
        const ipAddress = normalizeIp(getClientIp(req));

        const existingView = await prismaClient.marketingPublicationView.findFirst({
            where: {
                marketingPublication_id,
                ipAddress: ipAddress,
            },
        });

        if (existingView) {
            return { message: "View already counted" };
        }

        await prismaClient.marketingPublicationView.create({
            data: {
                marketingPublication_id,
                ipAddress: ipAddress,
            },
        });

        await prismaClient.marketingPublication.update({
            where: { id: marketingPublication_id },
            data: { clicks: { increment: 1 } },
        });

        return { message: "View successfully counted" };
    }
}

export { UpdateViewsPuplicationsService };