import prismaClient from "../../prisma";

class ListActivePopupsService {
    async execute() {
        const popups = await prismaClient.marketingPublication.findMany({
            where: {
                is_popup: true,
                status: "Disponivel",
                publish_at: {
                    lte: new Date(),
                },
            },
        });

        return popups.map((popup) => ({
            ...popup,
            popup_conditions: popup.popup_conditions
                ? JSON.parse(popup.popup_conditions)
                : null,
        }));
    }
}

export { ListActivePopupsService };