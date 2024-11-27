import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface CategoryProps {
    user_id: string;
}

class GenerateExcelCategoryService {
    async execute({ user_id }: CategoryProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Categories");

        worksheet.columns = [
            { header: "Nome da categiria", key: "name_category", width: 80 },
            { header: "Descrição", key: "description", width: 80 },
            { header: "Status", key: "status", width: 80 },
            { header: "Subcategoria?", key: "parentId", width: 80 },
        ];

        const users = [
            { name_category: "Motores", description: "Veja aqui tudo relacionado a motores", status: "Disponivel", parentId: "Insira aqui, o nome da categoria que deseja vincular" }
        ];

        users.forEach((category) => {
            worksheet.addRow(category);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de categorias gerada com suscesso",
                type: "category"
            }
        });

        return workbook;
    }
}

export { GenerateExcelCategoryService };
