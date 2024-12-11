import { Request, Response } from 'express';
import { MarketingPublicationDeleteService } from '../../services/marketing_publication/MarketingPublicationDeleteService'; 

class MarketingPublicationDeleteDeleteController {
    async handle(req: Request, res: Response) {

        let { id_delete, name} = req.body;

        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }

        const detail_publication = new MarketingPublicationDeleteService();
        const publications = await detail_publication.execute({ id_delete, name });

        return res.json(publications);
    }
}

export { MarketingPublicationDeleteDeleteController };