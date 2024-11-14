import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllCategoriesService {
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
        const whereClause: Prisma.CategoryWhereInput = {
            ...(
                search ? {
                    OR: [
                        { name_category: { contains: search, mode: Prisma.QueryMode.insensitive } }
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

        const all_categories = await prismaClient.category.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                children: {
                    include: {
                        parent: {
                            include: {
                                children: {
                                    include: {
                                        parent: {
                                            include: {
                                                children: {
                                                    include: {
                                                        parent: {
                                                            include: {
                                                                children: {
                                                                    include: {
                                                                        parent: {
                                                                            include: {
                                                                                children: {
                                                                                    include: {
                                                                                        parent: true
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const total_categories = await prismaClient.category.count({
            where: whereClause,
        });

        return {
            categories: all_categories,
            currentPage: page,
            totalPages: Math.ceil(total_categories / limit),
            totalCategories: total_categories,
        };
    }
}

export { AllCategoriesService };