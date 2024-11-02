import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class FormContactFindService {
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
        const whereClause: Prisma.Form_contactWhereInput = {
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
                        gte: new Date(startDate),
                        lte: new Date(endDate)
                    }
                } : {}
            )
        };

        const all_contacts_form = await prismaClient.form_contact.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });

        const total_contacts = await prismaClient.form_contact.count({
            where: whereClause,
        });

        return {
            contacts: all_contacts_form,
            currentPage: page,
            totalPages: Math.ceil(total_contacts / limit),
            totalContacts: total_contacts,
        };
    }
}

export { FormContactFindService };