import { Request, Response } from 'express';
import { NewsletterCreateService } from '../../services/newsletter/NewsletterCreateService'; 

class NewsletterCreateController {
    async handle(req: Request, res: Response) {
        const {
            name_user, email_user
        } = req.body;

        const create_news = new NewsletterCreateService();

        const news = await create_news.execute({
            name_user, email_user
        });

        return res.json(news)

    }
}

export { NewsletterCreateController }