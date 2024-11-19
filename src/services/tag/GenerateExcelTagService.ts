import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface TagProps {
    user_id: string;
}

class GenerateExcelTagService {
    async execute({ user_id }: TagProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tags");

        worksheet.columns = [
            { header: "Nome da Tag", key: "tag_name", width: 80 }
        ];

        const tags = [
            { tag_name: "oficina" },
        ];

        tags.forEach((tag) => {
            worksheet.addRow(tag);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de tags gerada com suscesso",
                type: "tag"
            }
        });

        return workbook;
    }
}

export { GenerateExcelTagService };
