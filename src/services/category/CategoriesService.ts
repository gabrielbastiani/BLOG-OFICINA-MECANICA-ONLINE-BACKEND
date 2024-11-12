import { StatusCategory } from "@prisma/client";
import prismaClient from "../../prisma";

class CategoriesService {
  async execute() {
    async function fetchChildren(parentId: string | null) {
      const categories = await prismaClient.category.findMany({
        where: { parentId },
        orderBy: { order: "asc" },
        include: {
          children: true,
        },
      });

      for (const category of categories) {
        if (category.children.length > 0) {
          category.children = await fetchChildren(category.id);
        }
      }
      return categories;
    }

    const rootCategories = await fetchChildren(null);

    const all_categories_disponivel = await prismaClient.category.findMany({
      where: {
        status: StatusCategory.Disponivel
      },
    });

    const data = {
      rootCategories,
      all_categories_disponivel
    }

    return data;

  }
  
}

export { CategoriesService };