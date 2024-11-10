import prismaClient from "../../prisma";

class CategoryUpdateOrderService {
    async execute(categories: { id: string; order: number; parentId: string | null }[]) {
        const updatePromises = categories.map(async (category) => {
            console.log(`Atualizando categoria ID ${category.id} com ordem ${category.order} e parentId ${category.parentId}`);
            return await prismaClient.category.update({
                where: { id: category.id },
                data: { 
                    order: category.order,
                    parentId: category.parentId
                },
            });
        });

        await Promise.all(updatePromises);

        return { message: "Ordem das categorias e subcategorias atualizada com sucesso" };
    }
}

export { CategoryUpdateOrderService };