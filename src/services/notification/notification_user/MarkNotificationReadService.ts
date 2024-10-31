import prismaClient from "../../../prisma";

interface NotificationRequest {
    notificationUser_id: string;
}

class MarkNotificationReadService {
    async execute({ notificationUser_id }: NotificationRequest) {
        const user_notification_user = await prismaClient.notificationUser.update({
            where: {
                id: notificationUser_id
            },
            data: {
                read: true
            }
        });

        return user_notification_user;

    }
}

export { MarkNotificationReadService }