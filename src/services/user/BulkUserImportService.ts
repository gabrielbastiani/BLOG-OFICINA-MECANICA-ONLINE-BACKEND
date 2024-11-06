import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import ExcelJS from "exceljs";
import bcrypt from "bcryptjs";

class BulkUserImportService {
    async execute(filePath: string) {

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

        const users = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            const [_, name, email, password, role] = row.values as (string | null)[];

            if (email === null || email === undefined) {
                console.warn(`Row ${rowNumber} has missing email: ${JSON.stringify(row.values)}`);
                return;
            }

            let emailText: string | null = null;
            /* @ts-ignore */
            if (typeof email === 'object' && email !== null && 'text' in email) {
                /* @ts-ignore */
                emailText = email.text;
            } else if (typeof email === 'string') {
                emailText = email;
            }

            if (!emailText) {
                console.warn(`Row ${rowNumber} has invalid email: ${JSON.stringify(row.values)}`);
                return;
            }

            if (!name || !emailText || !password || !role || typeof name !== 'string' || typeof emailText !== 'string' || typeof password !== 'string' || typeof role !== 'string') {
                console.warn(`Row ${rowNumber} has missing or invalid fields: ${JSON.stringify(row.values)}`);
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

            const hashedPassword = bcrypt.hashSync(password, 10);

            users.push({
                name,
                slug_name: removerAcentos(name),
                email: emailText,
                password: hashedPassword,
                role: role === "ADMIN" ? RoleUser.ADMIN : RoleUser.EMPLOYEE,
            });
        });

        try {
            const createdUsers = await prismaClient.user.createMany({
                data: users,
                skipDuplicates: true,
            });
            return createdUsers;
        } catch (error) {
            throw new Error("Failed to import users to database");
        }
    }
}

export { BulkUserImportService };