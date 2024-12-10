import { Request, Response } from 'express';
import { BulkDeleteMarketingPublicationService } from '../../services/marketing_publication/BulkDeleteMarketingPublicationService';
import multer from 'multer';

const upload = multer({ dest: 'temp_file/' }); // Diretório temporário para arquivos

class BulkDeleteMarketingPublicationController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: "Arquivo Excel não fornecido" });
        }

        const service = new BulkDeleteMarketingPublicationService();

        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json({ message: "Publicações de marketing deletados com sucesso", result });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar Publicações de marketing", details: error.message });
        }
    }
}

export { BulkDeleteMarketingPublicationController, upload };
