import prismaClient from "../../prisma";

class CategoryUpdateOrderService {
    async execute(categoryId: string, parentId: string | null, order: number) {
        const updatedCategory = await prismaClient.category.update({
            where: { id: categoryId },
            data: {
                parentId,
                order,
            },
        });

        return updatedCategory;
    }
}

export { CategoryUpdateOrderService };