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

        // Busca o maior valor de `order` entre as categorias com o mesmo `parentId`
        const maxOrderCategory = await prismaClient.category.findFirst({
            where: { parentId: parentId || null },
            orderBy: { order: 'desc' },
        });

        // Define o valor de `order` para a nova categoria
        const newOrder = maxOrderCategory ? maxOrderCategory.order + 1 : 1;

        // Cria a nova categoria com o valor de `order` definido
        const category = await prismaClient.category.create({
            data: {
                name_category,
                slug_name_category: removerAcentos(name_category),
                image_category: image_category,
                description: description,
                parentId: parentId || null,
                order: newOrder,
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
            message: `Categoria ${name_category} criada pelo usuário ${user_data?.name}.`,
            type: "category"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        return category;
    }
}

export { CategoryCreateService };