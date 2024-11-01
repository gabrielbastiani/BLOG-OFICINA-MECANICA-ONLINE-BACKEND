import prismaClient from "../../../prisma";

interface NotificationRequest {
    user_id: string;
}

class FindNotificationService {
    async execute({ user_id }: NotificationRequest) {

        const user_notification_user = await prismaClient.notificationUser.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return user_notification_user;

    }
}

export { FindNotificationService }