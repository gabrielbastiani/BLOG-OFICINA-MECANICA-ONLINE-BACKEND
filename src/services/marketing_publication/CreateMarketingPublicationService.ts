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
    configurationMarketingPublication?: string[];
}

class CreateMarketingPublicationService {
    async execute({
        title,
        description,
        image_url,
        redirect_url,
        publish_at_start,
        publish_at_end,
        status,
        configurationMarketingPublication,
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
                is_popup,
                status,
            },
        });

        if (configurationMarketingPublication && configurationMarketingPublication.length > 0) {
            await prismaClient.configurationMarketingOnPublication.createMany({
                data: configurationMarketingPublication.map((configurationMarketingType_id) => ({
                    marketingPublication_id: marketing_publication.id,
                    configurationMarketingType_id,
                })),
            });
        }

        // Lógica de envio de notificações (permanece a mesma)
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