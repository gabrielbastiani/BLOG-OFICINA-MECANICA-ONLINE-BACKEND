import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllUsersService {
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

        const whereClause: Prisma.UserWhereInput = {
            ...(
                search ? {
                    OR: [
                        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
                        { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    ]
                } : {}
            ),
            ...(
                startDate && endDate ? {
                    created_at: {
                        gte: moment(startDate).startOf('day').toISOString(),
                        lte: moment(endDate).endOf('day').toISOString(),
                    }
                } : {}
            ),
            role: { in: ["ADMIN", "EMPLOYEE"] },
            id: { not: user_id }
        };

        const all_users = await prismaClient.user.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });

        const total_users = await prismaClient.user.count({
            where: whereClause,
        });

        // -- ALL USERS --

        const autor = await prismaClient.user.findMany({
            where: {
                status: "Disponivel"
            },
            select: {
                name: true
            }
        });

        return {
            all_autor: autor,
            users: all_users,
            currentPage: page,
            totalPages: Math.ceil(total_users / limit),
            totalUsers: total_users,
        };
    }
}

export { AllUsersService };