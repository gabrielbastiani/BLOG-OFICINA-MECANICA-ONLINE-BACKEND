import { Request, Response } from 'express';
import { NotificationDeleteService } from '../../../services/notification/notification_user/NotificationDeleteService'; 

class NotificationDeleteController {
    async handle(req: Request, res: Response) {

        const { id_delete } = req.body;

        const formContactDeleteService = new NotificationDeleteService();

        const deleteNotification = await formContactDeleteService.execute({
            id_delete
        });

        return res.json(deleteNotification);
    }
}

export { NotificationDeleteController };