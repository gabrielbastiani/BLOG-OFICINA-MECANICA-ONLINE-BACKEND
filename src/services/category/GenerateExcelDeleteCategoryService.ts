import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface CategoryProps {
    user_id: string;
}

class GenerateExcelDeleteCategoryService {
    async execute({ user_id }: CategoryProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Categories");

        worksheet.columns = [
            { header: "Nome", key: "name_category", width: 80 }
        ];

        const categories = [
            { name_category: "Pistões" }
        ];

        categories.forEach((categ) => {
            worksheet.addRow(categ);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar categorias gerada com suscesso",
                type: "category"
            }
        });

        return workbook;
    }
}

export { GenerateExcelDeleteCategoryService };
