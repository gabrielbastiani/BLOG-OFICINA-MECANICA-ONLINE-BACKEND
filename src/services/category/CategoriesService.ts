import prismaClient from "../../prisma";

class CategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      where: { parentId: null },
      include: {
        children: true,
      },
    });

    return categories;
  }
}

export { CategoriesService };