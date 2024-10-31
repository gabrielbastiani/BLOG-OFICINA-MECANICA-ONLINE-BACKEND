import { Request, Response } from 'express'
import { FindNotificationService } from '../../../services/notification/notification_user/FindNotificationService'; 

class FindNotificationController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const notifications = new FindNotificationService();

        const noti_user = await notifications.execute({ user_id });

        return res.json(noti_user);

    }
}

export { FindNotificationController }