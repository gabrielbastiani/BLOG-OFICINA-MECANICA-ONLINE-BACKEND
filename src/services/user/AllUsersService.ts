import prismaClient from "../../prisma";

class AllUsersService {
    async execute(page: number = 1, limit: number = 5) {
        const skip = (page - 1) * limit;

        const all_users = await prismaClient.user.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: "desc"
            }
        });

        const total_users = await prismaClient.user.count();

        const super_find = await prismaClient.user.findMany({
            where: {
                role: "SUPER_ADMIN"
            }
        });

        const data = {
            users: all_users,
            super: super_find,
            currentPage: page,
            totalPages: Math.ceil(total_users / limit),
            totalUsers: total_users,
        };

        return data;
    }
}

export { AllUsersService };