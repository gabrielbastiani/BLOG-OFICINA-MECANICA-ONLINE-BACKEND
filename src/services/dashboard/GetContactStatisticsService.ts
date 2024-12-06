import prismaClient from "../../prisma";

class GetContactStatisticsService {
    async execute() {
        const dailyCount = await prismaClient.form_contact.count({
            where: {
                created_at: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)), // Hoje
                },
            },
        });

        const weeklyCount = await prismaClient.form_contact.count({
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Últimos 7 dias
                },
            },
        });

        const monthlyCount = await prismaClient.form_contact.count({
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Últimos 30 dias
                },
            },
        });

        const totalFormContacts = await prismaClient.form_contact.count();

        return {
            dailyCount,
            weeklyCount,
            monthlyCount,
            totalFormContacts
        };
    }
}

export { GetContactStatisticsService };