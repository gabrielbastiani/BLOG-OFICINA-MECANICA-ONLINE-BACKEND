import prismaClient from "../../prisma";
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

class GetPostStatisticsService {
    async execute() {
        const totalPosts = await prismaClient.post.count();
        const postsByStatus = await prismaClient.post.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const today = startOfDay(new Date());
        const thisWeek = startOfWeek(new Date());
        const thisMonth = startOfMonth(new Date());

        const dailyViews = await prismaClient.post.findMany({
            where: {
                updated_at: { gte: today },
            },
            select: {
                title: true,
                views: true,
            },
        });

        const weeklyViews = await prismaClient.post.findMany({
            where: {
                updated_at: { gte: thisWeek },
            },
            select: {
                title: true,
                views: true,
            },
        });

        const monthlyViews = await prismaClient.post.findMany({
            where: {
                updated_at: { gte: thisMonth },
            },
            select: {
                title: true,
                views: true,
            },
        });

        // Buscar posts programados
        const posts = await prismaClient.post.findMany({
            where: {
                status: "Indisponivel",
                publish_at: {
                    not: null, // Apenas posts com `publish_at`
                },
            },
            select: {
                id: true,
                title: true,
                publish_at: true,
                status: true,
            },
        });

        const totalPostsPublish = await prismaClient.post.count({
            where: {
                status: "Indisponivel",
                publish_at: {
                    not: null,
                },
            }
        });

        // Organizar os posts por ano, mês e dia
        const calendarData = posts.reduce((acc: any, post) => {
            const date = new Date(post.publish_at);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            if (!acc[year]) acc[year] = {};
            if (!acc[year][month]) acc[year][month] = {};
            if (!acc[year][month][day]) acc[year][month][day] = [];

            acc[year][month][day].push({
                id: post.id,
                title: post.title,
                publish_at: post.publish_at,
                status: post.status,
            });

            return acc;
        }, {});

        const metrics = await prismaClient.post.findMany({
            where: {
                status: "Disponivel"
            },
            select: {
                id: true,
                title: true,
                post_like: true,
                post_dislike: true,
            }
        });

        const metricsPostsLikesDislikes = metrics.map((post) => ({
            ...post,
            title: post.title.length > 30
                ? `${post.title.slice(0, 30)}...`
                : post.title,
        }));

        return {
            totalPosts,
            postsByStatus,
            dailyViews,
            weeklyViews,
            monthlyViews,
            calendarData,
            totalPostsPublish,
            metricsPostsLikesDislikes
        };
    }
}

export { GetPostStatisticsService };