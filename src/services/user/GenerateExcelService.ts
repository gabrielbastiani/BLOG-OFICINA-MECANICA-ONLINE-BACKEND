import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface UserProps {
    user_id: string;
}

class GenerateExcelService {
    async execute({ user_id }: UserProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        worksheet.columns = [
            { header: "Nome", key: "name", width: 80 },
            { header: "Email", key: "email", width: 80 },
            { header: "Senha", key: "senha", width: 80 },
            { header: "Role", key: "role", width: 80 },
        ];

        const users = [
            { name: "João Silva", email: "joao.silva@example.com", senha: "admin", role: "EMPLOYEE" },
            { name: "Maria Oliveira", email: "maria.oliveira@example.com", senha: "admin", role: "EMPLOYEE" },
        ];

        users.forEach((user) => {
            worksheet.addRow(user);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de usuarios gerada com suscesso",
                type: "user"
            }
        });

        return workbook;
    }
}

export { GenerateExcelService };
