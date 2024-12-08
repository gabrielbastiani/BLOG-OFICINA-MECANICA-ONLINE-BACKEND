import prismaClient from "../../prisma";

class GetCommentStatisticsService {
  async execute() {
    const commentsByStatus = await prismaClient.comment.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const metrics = await prismaClient.comment.findMany({
      select: {
        id: true,
        comment: true,
        comment_like: true,
        comment_dislike: true,
      },
    });

    const metricsCommentsLikesDislikes = metrics.map((com) => ({
      ...com,
      comment: com.comment.length > 30
        ? `${com.comment.slice(0, 30)}...`
        : com.comment,
    }));

    const totalComment = await prismaClient.comment.count();

    return { commentsByStatus, totalComment, metricsCommentsLikesDislikes };
  }
}

export { GetCommentStatisticsService };