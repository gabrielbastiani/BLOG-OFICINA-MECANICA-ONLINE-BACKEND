import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface TagsProps {
    user_id: string;
}

class GenerateExcelDeleteTagsService {
    async execute({ user_id }: TagsProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tags");

        worksheet.columns = [
            { header: "Nome", key: "tag_name", width: 80 }
        ];

        const tags = [
            { tag_name: "motor" }
        ];

        tags.forEach((tag) => {
            worksheet.addRow(tag);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar tags gerada com suscesso",
                type: "tag"
            }
        });

        return workbook;
    }
}

export { GenerateExcelDeleteTagsService };
