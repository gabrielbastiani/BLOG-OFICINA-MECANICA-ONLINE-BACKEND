import { Request, Response } from 'express';
import { NewsletterDeleteService } from '../../services/newsletter/NewsletterDeleteService'; 

class NewsletterDeleteController {
    async handle(req: Request, res: Response) {
        const { id_delete } = req.body

        const news = new NewsletterDeleteService();

        const latters = await news.execute({
            id_delete
        });

        return res.json(latters)

    }
}

export { NewsletterDeleteController }