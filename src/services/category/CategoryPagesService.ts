import prismaClient from "../../prisma";

interface CategoryPropos {
  page?: number;
  per_page?: number;
  searchQuery?: string;
  limit?: number;
  category_id?: string;
}

class CategoryPagesService {
  async execute({ page = 1, per_page, searchQuery, category_id }: CategoryPropos) {

    if (category_id) {
      const category_unique = await prismaClient.category.findUnique({
        where: {
          id: category_id
        }
      });

      return {
        category_unique
      };
    }

    const itemsPerPage = per_page === undefined ? 10 : per_page;
    const skip = (page - 1) * itemsPerPage;

    const where: any = {};

    if (searchQuery) {
      where.OR = [
        { name_category: { contains: searchQuery, mode: 'insensitive' } },
        { slug_name_category: { contains: searchQuery, mode: 'insensitive' } }
      ];
    }

    const categoies = await prismaClient.category.findMany({
      skip,
      take: itemsPerPage,
      where: where,
    });

    const total_categories = await prismaClient.category.count({
      where: where,
    });

    return {
      categoies,
      total_categories
    };

  }
}

export { CategoryPagesService };