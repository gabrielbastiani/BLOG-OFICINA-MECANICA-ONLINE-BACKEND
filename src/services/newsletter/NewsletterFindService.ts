import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class NewsletterFindService {
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
        const whereClause: Prisma.NewsletterWhereInput = {
            ...(
                search ? {
                    OR: [
                        { name_user: { contains: search, mode: Prisma.QueryMode.insensitive } },
                        { email_user: { contains: search, mode: Prisma.QueryMode.insensitive } },
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

        const all_newslater = await prismaClient.newsletter.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });

        const total_newslatter = await prismaClient.newsletter.count({
            where: whereClause,
        });

        return {
            newslatters: all_newslater,
            currentPage: page,
            totalPages: Math.ceil(total_newslatter / limit),
            totalNewslatter: total_newslatter,
        };
    }
}

export { NewsletterFindService };