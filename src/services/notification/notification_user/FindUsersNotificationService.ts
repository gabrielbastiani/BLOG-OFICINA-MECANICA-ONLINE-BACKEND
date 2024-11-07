import moment from "moment";
import prismaClient from "../../../prisma";
import { Prisma } from "@prisma/client";

class FindUsersNotificationService {
    async execute(
        page: number = 1,
        limit: number = 5,
        search: string = "",
        orderBy: string = "created_at",
        orderDirection: Prisma.SortOrder = "desc",
        startDate?: string,
        endDate?: string,
        user_id?: string
    ) {
        const skip = (page - 1) * limit;

        const whereClause: Prisma.NotificationUserWhereInput = {
            ...(search ? {
                OR: [
                    { message: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { type: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: moment(startDate).startOf('day').toISOString(),
                    lte: moment(endDate).endOf('day').toISOString(),
                }
            } : {}),
            ...(user_id ? { user_id } : {})
        };

        const all_notifications = await prismaClient.notificationUser.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });

        const total_notifications = await prismaClient.notificationUser.count({
            where: whereClause,
        });

        return {
            notifications_user: all_notifications,
            currentPage: page,
            totalPages: Math.ceil(total_notifications / limit),
            totalContacts: total_notifications,
        };
    }
}

export { FindUsersNotificationService };