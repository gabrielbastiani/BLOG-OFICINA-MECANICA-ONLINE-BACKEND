import prismaClient from "../../../prisma"; 

interface NotificationPropos {
    id_delete: string[];
}

class NotificationDeleteService {
    async execute({ id_delete }: NotificationPropos) {
        const deleteNotification = await prismaClient.notificationUser.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        return deleteNotification;
    }
}

export { NotificationDeleteService };