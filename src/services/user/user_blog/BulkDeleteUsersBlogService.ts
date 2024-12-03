import prismaClient from "../../../prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import { RoleUser } from "@prisma/client";
import path from "path";

class BulkDeleteUsersBlogService {
    async execute(filePath: string, user_id: string) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json<{ Email?: string }>(worksheet);

            const emailsToDelete = data
                .map(userBlog => userBlog.Email)
                .filter(email => email !== undefined && email !== null);

            const users = await prismaClient.userBlog.findMany({
                where: {
                    email: {
                        in: emailsToDelete
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
                message: `Usuário(s) do blog deletado(s) via planilha pelo usuario ${users_crate?.name}`,
                type: "user"
            }));

            users.forEach((userBlog) => {
                if (userBlog.image_user) {
                    const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + userBlog.image_user);
                    console.log(`Deleting image: ${imagePath}`);

                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete image for userBlog ${userBlog.id}: ${err.message}`);
                        } else {
                            console.log(`Image for userBlog ${userBlog.id} deleted successfully`);
                        }
                    });
                }
            });

            const deleteUsers = await prismaClient.userBlog.deleteMany({
                where: {
                    email: { in: emailsToDelete },
                },
            });

            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            return deleteUsers;

        } finally {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }
}

export { BulkDeleteUsersBlogService };