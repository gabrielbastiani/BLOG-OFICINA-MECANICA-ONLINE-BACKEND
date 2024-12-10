import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllMarketingPublicationService {
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
        const whereClause: Prisma.MarketingPublicationWhereInput = {
            ...(
                search ? {
                    OR: [
                        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
                        { description: { contains: search, mode: Prisma.QueryMode.insensitive } }
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

        const all_publications = await prismaClient.marketingPublication.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                marketingPublicationView: true
            }
        });

        const total_publications = await prismaClient.marketingPublication.count({
            where: whereClause,
        });

        return {
            publications: all_publications,
            currentPage: page,
            totalPages: Math.ceil(total_publications / limit),
            totalPublications: total_publications,
        };
    }
}

export { AllMarketingPublicationService };