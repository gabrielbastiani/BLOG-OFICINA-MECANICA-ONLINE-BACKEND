import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface PublicationProps {
    user_id: string;
}

class GenerateExcelDeletePublicationService {
    async execute({ user_id }: PublicationProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("MarketingPublication");

        worksheet.columns = [
            { header: "Nome", key: "title", width: 80 }
        ];

        const publications = [
            { title: "Publicidade no banner home" }
        ];

        publications.forEach((publi) => {
            worksheet.addRow(publi);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar as publicações de marketing gerada com suscesso",
                type: "marketing"
            }
        });

        return workbook;
    }
}

export { GenerateExcelDeletePublicationService };
