import prismaClient from "../../prisma";

class GetCommentStatisticsService {
  async execute() {
    const commentsByStatus = await prismaClient.comment.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const totalComment = await prismaClient.comment.count();

    return { commentsByStatus, totalComment };
  }
}

export { GetCommentStatisticsService };