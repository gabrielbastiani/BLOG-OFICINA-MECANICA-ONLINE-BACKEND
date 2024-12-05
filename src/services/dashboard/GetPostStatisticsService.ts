import prismaClient from "../../prisma";

class GetPostStatisticsService {
    async execute() {
        const totalPosts = await prismaClient.post.count();
        const postsByStatus = await prismaClient.post.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const postsByDate = await prismaClient.post.groupBy({
            by: ['created_at'],
            _count: { id: true },
        });

        return { totalPosts, postsByStatus, postsByDate };
    }
}

export { GetPostStatisticsService };