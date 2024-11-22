import prismaClient from "../../prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import { RoleUser } from "@prisma/client";
import path from "path";

class BulkDeleteCategoryService {
    async execute(filePath: string, user_id: string) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json<{ Nome?: string }>(worksheet);

            const categoryToDelete = data
                .map(category => category.Nome)
                .filter(name_category => name_category !== undefined && name_category !== null);

            const categories = await prismaClient.category.findMany({
                where: {
                    name_category: {
                        in: categoryToDelete
                    }
                }
            });

            const users_crate = await prismaClient.user.findUnique({
                where: {
                    id: user_id
                }
            });

            const users_superAdmins = await prismaClient.user.findMany({
                where: {
                    role: RoleUser.SUPER_ADMIN
                }
            });

            const all_user_ids = [
                ...users_superAdmins.map(user => user.id)
            ];

            const notificationsData = all_user_ids.map(user_id => ({
                user_id,
                message: `Categoria(s) deletada(s) via planilha pelo usuario ${users_crate?.name}`,
                type: "category"
            }));

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

            const delete_category = await prismaClient.category.deleteMany({
                where: {
                    name_category: { in: categoryToDelete },
                },
            });

            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            return delete_category;

        } finally {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }
}

export { BulkDeleteCategoryService };