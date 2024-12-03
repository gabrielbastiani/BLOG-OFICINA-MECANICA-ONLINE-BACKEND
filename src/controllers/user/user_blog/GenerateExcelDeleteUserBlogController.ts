import { Request, Response } from 'express';
import { GenerateExcelDeleteUserBlogService } from '../../../services/user/user_blog/GenerateExcelDeleteUserBlogService'; 

class GenerateExcelDeleteUserBlogController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;
        
        try {
            const generateExcelService = new GenerateExcelDeleteUserBlogService();
            const workbook = await generateExcelService.execute({ user_id });

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=modelo_de_dados.xlsx");

            await workbook.xlsx.write(res);

            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao gerar o arquivo Excel." });
        }
    }
}

export { GenerateExcelDeleteUserBlogController };