import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface PostsProps {
    user_id: string;
}

class GenerateExcelDeletePostsService {
    async execute({ user_id }: PostsProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Posts");

        worksheet.columns = [
            { header: "ID", key: "id", width: 80 }
        ];

        const posts = [
            { id: "99ad8924-7df7-4750-bc8e-268cece5e124" }
        ];

        posts.forEach((post) => {
            worksheet.addRow(post);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar posts gerada com suscesso",
                type: "post"
            }
        });

        return workbook;
    }
}

export { GenerateExcelDeletePostsService };
