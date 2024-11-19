import prismaClient from "../../prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import { RoleUser } from "@prisma/client";

class BulkDeleteTagsService {
    async execute(filePath: string, user_id: string) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json<{ Nome?: string }>(worksheet);

            const nomeToDelete = data
                .map(tag => tag.Nome)
                .filter(tag_name => tag_name !== undefined && tag_name !== null);

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
                message: `Tag(s) deletada(s) via planilha pelo usuario ${users_crate?.name}`,
                type: "tag"
            }));

            console.log(nomeToDelete)

            const deleteTags = await prismaClient.tag.deleteMany({
                where: {
                    tag_name: { in: nomeToDelete },
                },
            });

            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            return deleteTags;

        } finally {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }
}

export { BulkDeleteTagsService };