import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class AllTagsService {
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

        const whereClause: Prisma.TagWhereInput = {
            ...(
                search ? {
                    OR: [
                        { tag_name: { contains: search, mode: Prisma.QueryMode.insensitive } }
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

        const all_tags = await prismaClient.tag.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });

        const total_tags = await prismaClient.tag.count({
            where: whereClause,
        });

        // -- TODAS TAGS -- //

        const tags_all = await prismaClient.tag.findMany();

        return {
            tags_all: tags_all,
            tags: all_tags,
            currentPage: page,
            totalPages: Math.ceil(total_tags / limit),
            totalTags: total_tags,
        };
    }
}

export { AllTagsService };