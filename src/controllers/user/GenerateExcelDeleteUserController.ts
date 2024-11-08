import { Request, Response } from 'express';
import { GenerateExcelDeleteUserService } from '../../services/user/GenerateExcelDeleteUserService';

class GenerateExcelDeleteUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;
        
        try {
            const generateExcelService = new GenerateExcelDeleteUserService();
            const workbook = await generateExcelService.execute({ user_id });

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=modelo_delete_usuarios.xlsx");

            await workbook.xlsx.write(res);

            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao gerar o arquivo Excel." });
        }
    }
}

export { GenerateExcelDeleteUserController };