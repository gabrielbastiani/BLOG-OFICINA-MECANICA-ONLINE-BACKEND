import prismaClient from '../../prisma';
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

class GetNewsletterStatisticsService {
    async execute() {
        const today = startOfDay(new Date());
        const thisWeek = startOfWeek(new Date());
        const thisMonth = startOfMonth(new Date());

        const dailyCount = await prismaClient.newsletter.count({ where: { created_at: { gte: today } } });
        const weeklyCount = await prismaClient.newsletter.count({ where: { created_at: { gte: thisWeek } } });
        const monthlyCount = await prismaClient.newsletter.count({ where: { created_at: { gte: thisMonth } } });

        const totalNewslatters = await prismaClient.newsletter.count();

        return { dailyCount, weeklyCount, monthlyCount, totalNewslatters };
    }
}

export { GetNewsletterStatisticsService };