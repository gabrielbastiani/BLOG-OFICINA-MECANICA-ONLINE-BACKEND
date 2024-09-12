import { Request, Response } from 'express';
import { NewsletterDeleteService } from '../../services/newsletter/NewsletterDeleteService'; 

class NewsletterDeleteController {
    async handle(req: Request, res: Response) {
        const newsletter_id = req.query.newsletter_id as string;

        const news = new NewsletterDeleteService();

        const latters = await news.execute({
            newsletter_id
        });

        return res.json(latters)

    }
}

export { NewsletterDeleteController }