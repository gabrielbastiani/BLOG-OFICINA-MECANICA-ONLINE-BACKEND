import prismaClient from "../../../prisma";

interface NotificationRequest {
    user_id: string;
}

class MarkAllNotificationsAsReadService {
    async execute({ user_id }: NotificationRequest) {
        const user_notification_user = await prismaClient.notificationUser.updateMany({
            where: {
                read: false,
                user_id: user_id,
            },
            data: {
                read: true
            }
        });

        return user_notification_user;

    }
}

export { MarkAllNotificationsAsReadService }