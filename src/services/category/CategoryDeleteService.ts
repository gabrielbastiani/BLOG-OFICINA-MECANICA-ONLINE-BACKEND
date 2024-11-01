import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface CategoryRequest {
    category_id: string;
    user_id: string;
}

class CategoryDeleteService {
    async execute({ category_id, user_id }: CategoryRequest) {

        const user_data = await prismaClient.user.findUnique({
            where: {
                id: user_id
            }
        });

        const image_category = await prismaClient.category.findUnique({
            where: {
                id: category_id
            }
        });

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

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: `Categoria ${image_category.name_category} deletada pelo usuário ${user_data.name}`,
            type: "category"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + image_category.image_category);
        console.log(`Deleting image: ${imagePath}`);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            } else {
                console.log('Old image deleted successfully');
            }
        });

        const category = await prismaClient.category.delete({
            where: {
                id: category_id
            }
        });

        return category;

    }
}

export { CategoryDeleteService }