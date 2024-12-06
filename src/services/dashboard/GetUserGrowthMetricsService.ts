import prismaClient from '../../prisma';
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

class GetUserGrowthMetricsService {
    async execute() {
        const today = startOfDay(new Date());
        const thisWeek = startOfWeek(new Date());
        const thisMonth = startOfMonth(new Date());

        const dailyGrowth = await prismaClient.userBlog.count({
            where: { created_at: { gte: today } },
        });

        const weeklyGrowth = await prismaClient.userBlog.count({
            where: { created_at: { gte: thisWeek } },
        });

        const monthlyGrowth = await prismaClient.userBlog.count({
            where: { created_at: { gte: thisMonth } },
        });

        const totalUserBlog = await prismaClient.userBlog.count();

        return { dailyGrowth, weeklyGrowth, monthlyGrowth, totalUserBlog };
    }
}

export { GetUserGrowthMetricsService };