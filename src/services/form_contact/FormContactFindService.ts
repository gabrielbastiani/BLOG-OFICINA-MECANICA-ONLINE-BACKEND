import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client"; // Import do Prisma para usar QueryMode

class FormContactFindService {
    async execute(
        page: number = 1,
        limit: number = 5,
        search: string = "",
        orderBy: string = "created_at",
        orderDirection: Prisma.SortOrder = "desc" // Novo parâmetro para direção de ordenação
    ) {
        const skip = (page - 1) * limit;

        const whereClause: Prisma.Form_contactWhereInput = search
            ? {
                OR: [
                    { name_user: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { email_user: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
            }
            : {};

        const all_contacts_form = await prismaClient.form_contact.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection }, // Usando o orderDirection aqui
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