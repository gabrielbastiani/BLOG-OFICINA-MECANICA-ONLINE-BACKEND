import { Request, Response } from 'express';
import { PostCategoryUpdateDataService } from '../../services/post_category/PostCategoryUpdateDataService';

class PostCategoryUpdateDataController {
    async handle(req: Request, res: Response) {

        const post_category_id = req.query.post_category_id as string;

        const {
            name_category, status, order, main_category
        } = req.body;

        const update_category = new PostCategoryUpdateDataService();

        const category = await update_category.execute({
            post_category_id,
            name_category,
            status,
            order,
            main_category
        });

        return res.json(category);
    }
}

export { PostCategoryUpdateDataController };