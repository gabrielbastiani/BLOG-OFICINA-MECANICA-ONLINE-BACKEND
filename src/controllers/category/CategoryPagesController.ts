import { Request, Response } from 'express';
import { CategoryPagesService } from '../../services/category/CategoryPagesService';

class CategoryPagesController {
    async handle(req: Request, res: Response) {
        const {
            pagina,
            q,
            category_id
        } = req.query;

        const categories_all = new CategoryPagesService();
        const categories = await categories_all.execute({
            page: parseInt(pagina as string) || 1,
            searchQuery: q as string,
            category_id: category_id as string
        });

        return res.json(categories);
    }
}

export { CategoryPagesController };