import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllPostService {
  async execute(
    page: number = 1,
    limit: number = 5,
    search: string = "",
    orderBy: string = "created_at",
    orderDirection: Prisma.SortOrder = "desc",
    startDate?: string,
    endDate?: string
  ) {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.PostWhereInput = {
      ...(
        search ? {
          OR: [
            { author: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ]
        } : {}
      ),
      ...(
        startDate && endDate ? {
          created_at: {
            gte: moment(startDate).startOf('day').toISOString(),
            lte: moment(endDate).endOf('day').toISOString(),
          }
        } : {}
      )
    };

    const all_posts = await prismaClient.post.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        comment: true
      }
    });

    const total_posts = await prismaClient.post.count({
      where: whereClause,
    });

    return {
      posts: all_posts,
      currentPage: page,
      totalPages: Math.ceil(total_posts / limit),
      totalPosts: total_posts,
    };
  }
}

export { AllPostService };