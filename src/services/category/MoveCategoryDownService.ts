import prismaClient from "../../prisma";

class MoveCategoryDownService {
    async moveCategoryDown(categoryId: string) {
      const category = await prismaClient.category.findUnique({ where: { id: categoryId } });
      if (!category) throw new Error("Categoria não encontrada");
  
      const nextCategory = await prismaClient.category.findFirst({
        where: { parentId: category.parentId, order: { gt: category.order } },
        orderBy: { order: "asc" },
      });
      if (!nextCategory) return;
  
      // Troca as posições
      await prismaClient.category.update({
        where: { id: categoryId },
        data: { order: nextCategory.order },
      });
  
      await prismaClient.category.update({
        where: { id: nextCategory.id },
        data: { order: category.order },
      });
    }
  }
  
  export { MoveCategoryDownService }