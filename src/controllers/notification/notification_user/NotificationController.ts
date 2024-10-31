import { Request, Response } from 'express';
import { NotificationService } from '../../../services/notification/notification_user/NotificationService';

const notificationService = new NotificationService();

class NotificationController {
  async getNotifications(req: Request, res: Response) {
    /* try {
  async markNotificationRead(req: Request, res: Response) {
    try {
      const { notificationId } = req.body;

      const notification = await notificationService.markNotificationAsRead(notificationId);
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao marcar notificação como lida' });
    }
  }

  async markAllNotificationsRead(req: Request, res: Response) {
    try {
      const userId = req?.user_id || req?.userBlog_id;
      const userType = req?.user_id ? 'user_id' : 'userBlog_id';

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      await notificationService.markAllNotificationsAsRead(userId, userType);
      res.status(200).json({ message: 'Todas as notificações foram marcadas como lidas' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao marcar todas as notificações como lidas' });
    } */
  }
}

export { NotificationController };