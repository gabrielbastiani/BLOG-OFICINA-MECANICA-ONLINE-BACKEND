import { Request, Response } from 'express'
import { MarkNotificationReadService } from '../../../services/notification/notification_user/MarkNotificationReadService'; 

class MarkNotificationReadController {
    async handle(req: Request, res: Response) {

        const notificationUser_id = req.query.notificationUser_id as string;

        const notifications = new MarkNotificationReadService();

        const noti_user = await notifications.execute({ notificationUser_id });

        return res.json(noti_user);

    }
}

export { MarkNotificationReadController }