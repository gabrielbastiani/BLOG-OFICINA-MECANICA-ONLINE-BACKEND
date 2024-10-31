import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class NotificationService {

    /* async getAllNotifications(user_id: string, userType: 'user_id' | 'userBlog_id') {
        return await prisma.notification.findMany({
            where: userType === 'user_id' ? { user_id } : { userBlog_id: user_id },
            orderBy: { created_at: 'desc' },
        });
    }

    async markNotificationAsRead(notificationId: string) {
        return await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });
    }

    async markAllNotificationsAsRead(user_id: string, userType: 'user_id' | 'userBlog_id') {
        return await prisma.notification.updateMany({
            where: {
                read: false,
                ...(userType === 'user_id' ? { user_id } : { userBlog_id: user_id }),
            },
            data: { read: true },
        });
    } */
}

export { NotificationService };