import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface UserProps {
    user_id: string;
}

class GenerateExcelDeleteUserService {
    async execute({ user_id }: UserProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        worksheet.columns = [
            { header: "Email", key: "email", width: 80 }
        ];

        const users = [
            { email: "joao.silva@example.com" }
        ];

        users.forEach((user) => {
            worksheet.addRow(user);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar usuarios gerada com suscesso",
                type: "user"
            }
        });

        return workbook;
    }
}

export { GenerateExcelDeleteUserService };
