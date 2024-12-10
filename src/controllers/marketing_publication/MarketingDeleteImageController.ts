import { Request, Response } from 'express'
import { MarketingDeleteImageService } from '../../services/marketing_publication/MarketingDeleteImageService'; 

class MarketingDeleteImageController {
    async handle(req: Request, res: Response) {

        const marketingPublication_id = req.query.marketingPublication_id as string;

        const delete_image = new MarketingDeleteImageService();

        const publication = await delete_image.execute({ marketingPublication_id });

        return res.json(publication);

    }
}

export { MarketingDeleteImageController }