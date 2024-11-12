import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";

interface CategoryRequest {
    user_id: string;
    name_category: string;
    image_category?: string;
    description?: string;
    parentId?: string;
}

class CategoryCreateService {
    async execute({ user_id, name_category, image_category, description, parentId }: CategoryRequest) {
        if (!name_category) {
            throw new Error("O nome da categoria é obrigatório.");
        }

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        // Variável para armazenar o valor de order
        let order: number;

        if (parentId) {
            // Se for uma subcategoria, buscamos as subcategorias já existentes para o parentId
            const parentCategory = await prismaClient.category.findUnique({
                where: { id: parentId },
                select: { order: true }
            });

            if (!parentCategory) {
                throw new Error("Categoria pai não encontrada.");
            }

            // Busca todas as subcategorias do mesmo parentId
            const siblingCategories = await prismaClient.category.findMany({
                where: { parentId },
                orderBy: { order: 'desc' },
                select: { order: true }
            });

            // Calcula o próximo valor de order para a subcategoria
            if (siblingCategories.length > 0) {
                // Para subcategorias, verificamos o maior valor de order e incrementamos
                const lastOrder = siblingCategories[0].order!;
                // O novo order será incrementado por 0.1 ou por uma fração mais precisa
                order = parseFloat((lastOrder + 0.1).toFixed(1));
            } else {
                // Se não houver subcategorias, cria uma nova com base no pai
                order = parseFloat((parentCategory.order! + 0.1).toFixed(1));
            }
        } else {
            // Se for uma categoria de nível superior, buscamos a maior ordem
            const lastCategory = await prismaClient.category.findFirst({
                where: { parentId: null },  // Somente categorias de nível superior
                orderBy: { order: 'desc' },
                select: { order: true }
            });

            // Define o valor de order com base na maior ordem existente ou usa 1.0 como padrão
            order = lastCategory ? parseFloat((lastCategory.order! + 1.0).toFixed(1)) : 1.0;
        }

        // Cria a categoria
        const category = await prismaClient.category.create({
            data: {
                name_category,
                slug_name_category: removerAcentos(name_category),
                image_category: image_category,
                description: description,
                parentId: parentId || null,
                order: order
            }
        });

        // Notificação de criação para administradores e superadministradores
        const user_data = await prismaClient.user.findUnique({
            where: { id: user_id }
        });

        const users_superAdmins = await prismaClient.user.findMany({
            where: { role: RoleUser.SUPER_ADMIN }
        });

        const users_admins = await prismaClient.user.findMany({
            where: { role: RoleUser.ADMIN }
        });

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: `Categoria ${name_category} criada pelo usuário ${user_data.name}.`,
            type: "category"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        return category;
    }
}

export { CategoryCreateService }