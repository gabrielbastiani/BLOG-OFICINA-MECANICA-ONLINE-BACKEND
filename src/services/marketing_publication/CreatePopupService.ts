import prismaClient from "../../prisma";

interface CreatePopupProps {
    title: string;
    description?: string;
    image_url?: string;
    redirect_url?: string;
    popup_position: string;
    popup_behavior: string;
    popup_conditions?: Record<string, any>; // JSON para condições
    status?: "Disponivel" | "Indisponivel";
}

class CreatePopupService {
    async execute({
        title,
        description,
        image_url,
        redirect_url,
        popup_position,
        popup_behavior,
        popup_conditions,
        status = "Disponivel",
    }: CreatePopupProps) {
        const popup = await prismaClient.marketingPublication.create({
            data: {
                title,
                description,
                image_url,
                redirect_url,
                is_popup: true,
                popup_position,
                popup_behavior,
                popup_conditions: popup_conditions
                    ? JSON.stringify(popup_conditions)
                    : null,
                status,
            },
        });

        return popup;
    }
}

export { CreatePopupService };