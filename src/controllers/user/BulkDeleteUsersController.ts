import { Request, Response } from 'express';
import { BulkDeleteUsersService } from '../../services/user/BulkDeleteUsersService';

class BulkDeleteUsersController {
    async handle(req: Request, res: Response) {
        const file = req.file as Express.Multer.File;

        if (!file) {
            return res.status(400).json({ error: "Arquivo de planilha não enviado." });
        }

        const deleteUsersService = new BulkDeleteUsersService();

        try {
            const result = await deleteUsersService.execute(file.buffer); // Passando o buffer diretamente
            return res.status(200).json({
                message: `${result.count} usuários foram deletados com sucesso.`
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { BulkDeleteUsersController };