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
            AND: [
                // Filtro de texto
                search
                    ? {
                        OR: [
                            { status: { contains: search, mode: Prisma.QueryMode.insensitive } },
                            { post: { title: { contains: search, mode: Prisma.QueryMode.insensitive } } },
                            { userBlog: { name: { contains: search, mode: Prisma.QueryMode.insensitive } } },
                        ],
                    }
                    : {},
                // Filtro de datas
                startDate && endDate
                    ? {
                        created_at: {
                            gte: moment(startDate).startOf("day").toISOString(),
                            lte: moment(endDate).endOf("day").toISOString(),
                        },
                    }
                    : {},
            ],
        };

        // Buscar os comentários com paginação e ordenação
        const all_comments = await prismaClient.comment.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                commentLikes: true,
                post: true,
                userBlog: true,
                replies: true,
                parent: true,
            },
        });

        // Calcular o total de respostas (diretas e indiretas)
        const enrichedComments = await Promise.all(
            all_comments.map(async (comment) => {
                // Buscar respostas diretas e indiretas
                const directReplies = await prismaClient.comment.count({
                    where: { parentId: comment.id },
                });

                const indirectReplies = await prismaClient.comment.count({
                    where: { parent: { parentId: comment.id } },
                });

                return {
                    ...comment,
                    replyCount: directReplies + indirectReplies,
                };
            })
        );

        const total_comments = await prismaClient.comment.count({
            where: whereClause,
        });

        return {
            comments: enrichedComments,
            currentPage: page,
            totalPages: Math.ceil(total_comments / limit),
            totalContacts: total_comments,
        };
    }
}

export { AllCommentService };