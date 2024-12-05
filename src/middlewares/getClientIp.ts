import { Request } from 'express';

export function getClientIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'] as string;
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || '';
}