import prismaClient from "../../prisma";

class GetCategoryStatisticsService {
    async execute() {
        const totalCategories = await prismaClient.category.count();

        // Agrupando categorias por parentId
        const subcategories = await prismaClient.category.groupBy({
            by: ['parentId'],
            _count: { id: true },
        });

        // Buscando os nomes das categorias associadas aos parentIds
        const parentCategories = await prismaClient.category.findMany({
            where: {
                id: {
                    in: subcategories.map(sub => sub.parentId).filter(id => id !== null),
                },
            },
            select: {
                id: true,
                name_category: true,
            },
        });

        // Mapeando para incluir os nomes das categorias no retorno
        const subcategoriesWithNames = subcategories.map(sub => {
            const parentCategory = parentCategories.find(cat => cat.id === sub.parentId);
            return {
                ...sub,
                parentName: parentCategory ? parentCategory.name_category : 'Sem subcategoria',
            };
        });

        return { totalCategories, subcategories: subcategoriesWithNames };
    }
}

export { GetCategoryStatisticsService };