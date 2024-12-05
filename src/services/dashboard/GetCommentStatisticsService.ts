import prismaClient from "../../prisma";

class GetCommentStatisticsService {
  async execute() {
    const commentsByStatus = await prismaClient.comment.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    return { commentsByStatus };
  }
}

export { GetCommentStatisticsService };