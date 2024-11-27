import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllCommentService {
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

        // Construção da cláusula 'where' com filtro de texto e data
        const whereClause: Prisma.CommentWhereInput = {
            ...(
                search ? {
                    OR: [
                        { include: { post: title: { contains: search, mode: Prisma.QueryMode.insensitive } } },
                        { include: { userBlog: name: { contains: search, mode: Prisma.QueryMode.insensitive } } },
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

        const all_comments = await prismaClient.comment.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                commentLikes: true,
                post: true,
                userBlog: true
            }
        });

        const total_comments = await prismaClient.comment.count({
            where: whereClause,
        });

        return {
            comments: all_comments,
            currentPage: page,
            totalPages: Math.ceil(total_comments / limit),
            totalContacts: total_comments,
        };
    }
}

export { AllCommentService };