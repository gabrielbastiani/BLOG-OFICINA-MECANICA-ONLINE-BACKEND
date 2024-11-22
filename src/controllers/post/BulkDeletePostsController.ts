import { Request, Response } from 'express';
import { BulkDeletePostsService } from '../../services/post/BulkDeletePostsService'; 
import multer from 'multer';

const upload = multer({ dest: 'temp_file/' });

class BulkDeletePostsController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: "Arquivo Excel não fornecido" });
        }

        const service = new BulkDeletePostsService();

        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json({ message: "Posts deletadas com sucesso", result });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar posts", details: error.message });
        }
    }
}

export { BulkDeletePostsController, upload };
