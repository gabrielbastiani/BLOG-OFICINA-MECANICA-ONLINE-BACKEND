import moment from "moment";
import prismaClient from "../../../prisma"; 
import { Prisma } from "@prisma/client";

class AllTypeConfigurationMarketingService {
    async execute(
        configurationMarketingType_id?: string,
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
        const whereClause: Prisma.ConfigurationMarketingTypeWhereInput = {
            ...(
                search ? {
                    OR: [
                        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
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

        const all_configurations = await prismaClient.configurationMarketingType.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                configurationMarketingConfiguration: {
                    include: {
                        configurationMarketingOnPublication: {
                            include: {
                                marketingPublication: true
                            }
                        }
                    }
                }
            }
        });

        const total_publications = await prismaClient.configurationMarketingType.count({
            where: whereClause,
        });

        // --- UNIQUE CONFIGURATION ---//

        let configurationMarketing = null;

        if (configurationMarketingType_id) {
            configurationMarketing = await prismaClient.configurationMarketingType.findUnique({
                where: {
                    id: configurationMarketingType_id,
                },
                include: {
                    configurationMarketingConfiguration: {
                        include: {
                            configurationMarketingOnPublication: {
                                include: {
                                    marketingPublication: true
                                }
                            }
                        }
                    }
                }
            });
        }

        return {
            unique_type_configuration: configurationMarketing,
            configurations: all_configurations,
            currentPage: page,
            totalPages: Math.ceil(total_publications / limit),
            totalPublications: total_publications
        };
    }
}

export { AllTypeConfigurationMarketingService };