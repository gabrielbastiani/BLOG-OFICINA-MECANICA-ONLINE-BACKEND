import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface UserRequest {
    id_delete: string[];
    name?: string;
}

class CategoryDeleteService {
    async execute({ id_delete, name }: UserRequest) {

        const categories = await prismaClient.category.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        categories.forEach((category) => {
            if (category.image_category) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + category.image_category);
                console.log(`Deleting image: ${imagePath}`);

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for category ${category.id}: ${err.message}`);
                    } else {
                        console.log(`Image for category ${category.id} deleted successfully`);
                    }
                });
            }
        });

        // Remoção das categorias do banco de dados
        const deleted_categories = await prismaClient.category.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        // Busca de IDs dos usuários SUPER_ADMIN e ADMIN
        const users_superAdmins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        const users_admins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.ADMIN
            }
        });

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];

        // Criação de notificações para cada categoria deletada e cada usuário
        await prismaClient.notificationUser.createMany({
            data: categories.flatMap((category) =>
                all_user_ids.map((user_id) => ({
                    user_id,
                    message: `Categoria(s) ${category.name_category} foi deletada(s) pelo usuário ${name}.`,
                    type: "category"
                }))
            )
        });

        return deleted_categories;
    }
}

export { CategoryDeleteService };