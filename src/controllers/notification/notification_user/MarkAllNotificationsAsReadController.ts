import { Request, Response } from 'express'
import { MarkAllNotificationsAsReadService } from '../../../services/notification/notification_user/MarkAllNotificationsAsReadService';

class MarkAllNotificationsAsReadController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const notifications = new MarkAllNotificationsAsReadService();

        const noti_user = await notifications.execute({ user_id });

        return res.json(noti_user);

    }
}

export { MarkAllNotificationsAsReadController }