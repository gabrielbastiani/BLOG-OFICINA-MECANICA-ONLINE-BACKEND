import prismaClient from "../../prisma";

class MoveCategoryUpService {
    async moveCategoryUp(categoryId: string) {

        const category = await prismaClient.category.findUnique({ where: { id: categoryId } });
        if (!category) throw new Error("Categoria não encontrada");

        const previousCategory = await prismaClient.category.findFirst({
            where: { parentId: category.parentId, order: { lt: category.order } },
            orderBy: { order: "desc" },
        });
        
        if (!previousCategory) return;

        // Troca as posições
        await prismaClient.category.update({
            where: { id: categoryId },
            data: { order: previousCategory.order },
        });

        await prismaClient.category.update({
            where: { id: previousCategory.id },
            data: { order: category.order },
        });
    }
}

export { MoveCategoryUpService }