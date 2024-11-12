import prismaClient from "../../prisma";

interface UpdateCategoryOrderData {
    draggedId: string;
    targetId: string | null;
}

class CategoryUpdateOrderService {
    async execute({ draggedId, targetId }: UpdateCategoryOrderData) {
        return await prismaClient.category.update({
            where: { id: draggedId },
            data: {
                parentId: targetId,
            },
        });
    }
}

export { CategoryUpdateOrderService };