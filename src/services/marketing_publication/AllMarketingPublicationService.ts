import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllMarketingPublicationService {
    async execute(
        marketing_content_id?: string,
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
                configurationMarketingOnPublication: true
            }
        });

        const total_publications = await prismaClient.marketingPublication.count({
            where: whereClause,
        });

        // --- UNIQUE Publication ---//

        let marketing_content_unique = null;

        if (marketing_content_id) {
            marketing_content_unique = await prismaClient.marketingPublication.findUnique({
                where: {
                    id: marketing_content_id,
                },
                include: {
                    configurationMarketingOnPublication: true
                }
            });
        }

        return {
            unique_marketing_content: marketing_content_unique,
            publications: all_publications,
            currentPage: page,
            totalPages: Math.ceil(total_publications / limit),
            totalPublications: total_publications,
        };
    }
}

export { AllMarketingPublicationService };