import prismaClient from "../../prisma";

class ListActivePopupsService {
    async execute() {
        const popups = await prismaClient.marketingPublication.findMany({
            where: {
                is_popup: true,
                status: "Disponivel",
                publish_at_start: {
                    lte: new Date(),
                },
            },
        });

        return popups.map((popup) => ({
            ...popup,
            popup_conditions: popup.popup_conditions
        }));
    }
}

export { ListActivePopupsService };