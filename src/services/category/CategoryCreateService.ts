import prismaClient from "../../prisma";

interface CategoryRequest {
    name_category: string;
    image_category?: string;
    description: string;
}

class CategoryCreateService {
    async execute({ name_category, image_category, description }: CategoryRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const category = await prismaClient.category.create({
            data: {
                name_category: name_category,
                slug_name_category: removerAcentos(name_category),
                image_category: image_category,
                description: description
            }
        });

        return category;

    }
}

export { CategoryCreateService }