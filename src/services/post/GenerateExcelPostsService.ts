import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface PostsProps {
    user_id: string;
}

class GenerateExcelPostsService {
    async execute({ user_id }: PostsProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Posts");

        worksheet.columns = [
            { header: "Autor", key: "author", width: 80 },
            { header: "Titulo do post", key: "title", width: 80 },
            { header: "Status", key: "status", width: 80 },
            { header: "Publicação programada", key: "publish_at", width: 80 },
            { header: "Tags do post", key: "tags", width: 80 },
            { header: "Categorias do post", key: "categories", width: 80 }
        ];

        const posts = [
            {
                author: "Aqui insira seu nome, ou algum nome de forma exata como esta no cadastro",
                title: "Como funciona um motor?",
                status: "Indisponivel",
                publish_at: "01/01/2033 01:00",
                categories: `6eac8901-8a2b-49a7-aea9-abfcde426e84, ca7e14db-b5bb-4d17-accf-62c059105b52`,
                tags: `273c1d02-03b3-4085-ac40-d9da142b9a00, ba95c0b0-7720-4aea-b3f2-0b392609e898`,
            }
        ];

        posts.forEach((post) => {
            worksheet.addRow(post);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de posts gerada com suscesso",
                type: "post"
            }
        });

        return workbook;
    }
}

export { GenerateExcelPostsService };
