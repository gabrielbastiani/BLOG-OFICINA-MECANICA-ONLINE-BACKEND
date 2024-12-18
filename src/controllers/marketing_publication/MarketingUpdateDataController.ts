import { Request, Response } from 'express';
import { MarketingUpdateDataService } from '../../services/marketing_publication/MarketingUpdateDataService';

class MarketingUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            marketingPublication_id,
            title,
            description,
            status,
            redirect_url,
            publish_at_start,
            publish_at_end,
            configurationMarketingOnPublication
        } = req.body;

        const update_publication = new MarketingUpdateDataService();

        let imageToUpdate = req.body.image_url;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const publications = await update_publication.execute({
            marketingPublication_id,
            title,
            description,
            image_url: imageToUpdate,
            status,
            redirect_url,
            publish_at_start,
            publish_at_end,
            configurationMarketingOnPublication: configurationMarketingOnPublication ? JSON.parse(configurationMarketingOnPublication) : undefined,
        });

        return res.json(publications);
    }
}

export { MarketingUpdateDataController };