import { Request, Response } from 'express';
import { NewsletterFindService } from '../../services/newsletter/NewsletterFindService'; 

class NewsletterFindController {
    async handle(req: Request, res: Response) {
        const newsletter_id = req.query.newsletter_id as string;

        const news = new NewsletterFindService();

        const letters = await news.execute({
            newsletter_id
        });

        return res.json(letters)

    }
}

export { NewsletterFindController }