import prismaClient from "../../prisma";

interface PostRequest {
  page?: number;
  per_page?: number;
  searchQuery?: string;
  limit?: number;
  post_id?: string;
}

class PostPagesService {
  async execute({ page = 1, per_page, searchQuery, post_id }: PostRequest) {

    if (post_id) {
      const post_unique = await prismaClient.post.findUnique({
        where: {
          id: post_id
        }
      });

      return {
        post_unique
      };
    }

    const itemsPerPage = per_page === undefined ? 10 : per_page;
    const skip = (page - 1) * itemsPerPage;

    const where: any = {};

    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { text_post: { contains: searchQuery, mode: 'insensitive' } }
      ];
    }

    const posts = await prismaClient.post.findMany({
      skip,
      take: itemsPerPage,
      where: where,
    });

    const total_posts = await prismaClient.post.count({
      where: where,
    });

    return {
      posts,
      total_posts
    };

  }
}

export { PostPagesService };