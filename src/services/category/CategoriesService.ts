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

    // Fetch all root-level categories with their children recursively
    const rootCategories = await fetchChildren(null);
    return rootCategories;
  }
}

export { CategoriesService };