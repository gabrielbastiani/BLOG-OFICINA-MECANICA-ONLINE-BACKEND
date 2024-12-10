import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";

interface CreateMarketingPublicationServiceProps {
    title?: string;
    description?: string;
    image_url?: string;
    redirect_url?: string;
    publish_at_start?: Date;
    publish_at_end?: Date;
    status?: "Disponivel" | "Indisponivel";
    is_popup?: boolean;
    local_site?: string[];
    popup_position?: string[];
    popup_behavior?: string[];
    popup_conditions?: string[];
}

class CreateMarketingPublicationService {
    async execute({
        title,
        description,
        image_url,
        redirect_url,
        publish_at_start,
        publish_at_end,
        local_site,
        status,
        popup_position,
        popup_behavior,
        popup_conditions,
        is_popup
    }: CreateMarketingPublicationServiceProps) {
        const marketing_publication = await prismaClient.marketingPublication.create({
            data: {
                title,
                description,
                image_url,
                redirect_url,
                publish_at_start,
                publish_at_end,
                local_site,
                is_popup,
                popup_position,
                popup_behavior,
                popup_conditions,
                status,
            },
        });

        const users_superAdmins = await prismaClient.user.findMany({ where: { role: RoleUser.SUPER_ADMIN } });
        const users_admins = await prismaClient.user.findMany({ where: { role: RoleUser.ADMIN } });

        const all_user_ids = [
            ...users_superAdmins.map((user) => user.id),
            ...users_admins.map((user) => user.id),
        ];

        const notificationsData = all_user_ids.map((user_id) => ({
            user_id,
            message: `Publicidade "${title ? title : "Sem titulo"}" cadastrada.`,
            type: "marketing",
        }));

        await prismaClient.notificationUser.createMany({ data: notificationsData });

        return marketing_publication;
    }
}

export { CreateMarketingPublicationService };