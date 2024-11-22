import prismaClient from "../../prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import { RoleUser } from "@prisma/client";

class BulkDeletePostsService {
    async execute(filePath: string, user_id: string) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json<{ ID?: string }>(worksheet);

            const idToDelete = data
                .map(post => post.ID)
                .filter(id => id !== undefined && id !== null);

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
                message: `Post(s) deletada(s) via planilha pelo usuario ${users_crate?.name}`,
                type: "post"
            }));

            const deletePosts = await prismaClient.post.deleteMany({
                where: {
                    id: { in: idToDelete },
                },
            });

            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            return deletePosts;

        } finally {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }
}

export { BulkDeletePostsService };