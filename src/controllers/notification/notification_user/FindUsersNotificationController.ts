import { Request, Response } from "express";
import { FindUsersNotificationService } from "../../../services/notification/notification_user/FindUsersNotificationService"; 
import { Prisma } from "@prisma/client";

class FindUsersNotificationController {
    async handle(req: Request, res: Response) {
        const { 
            page = 1, 
            limit = 5, 
            search = "", 
            orderBy = "created_at", 
            orderDirection = "desc",
            startDate,
            endDate,
            user_id
        } = req.query;

        const allNotifications = new FindUsersNotificationService();
        const notifications = await allNotifications.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined,
            user_id ? String(user_id) : undefined,
        );

        return res.json(notifications);
    }
}

export { FindUsersNotificationController };