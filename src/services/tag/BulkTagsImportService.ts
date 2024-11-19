import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import ExcelJS from "exceljs";
import fs from "fs";

class BulkTagsImportService {
    async execute(filePath: string, user_id: string) {

        const workbook = new ExcelJS.Workbook();

        try {
            await workbook.xlsx.readFile(filePath);
        } catch (error) {
            throw new Error("Failed to read Excel file");
        }

        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
            throw new Error("No worksheet found in Excel file");
        }

        const tags = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            const [_, tag_name] = row.values as (string | null)[];

            if (tag_name === null || tag_name === undefined) {
                console.warn(`Row ${rowNumber} has missing email: ${JSON.stringify(row.values)}`);
                return;
            }

            function removerAcentos(s: any) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            tags.push({
                tag_name,
                slug_tag_name: removerAcentos(tag_name)
            });
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
            message: `Tag(s) criada(s) via planilha pelo usuario ${users_crate.name}`,
            type: "user"
        }));

        try {
            const createdUsers = await prismaClient.tag.createMany({
                data: tags,
                skipDuplicates: true,
            });
            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });
            return createdUsers;
        } catch (error) {
            throw new Error("Failed to import tags to database");
        } finally {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete file:", err);
                } else {
                    console.log("File deleted successfully");
                }
            });
        }
    }
}

export { BulkTagsImportService };