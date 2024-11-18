import { Request, Response } from 'express';
import { PostCategoryUpdateDataService } from '../../services/post_category/PostCategoryUpdateDataService';

class PostCategoryUpdateDataController {
    async handle(req: Request, res: Response) {

        const categoryOnPost_id = req.query.categoryOnPost_id as string;

        const {
            post_id
        } = req.body;

        const update_category = new PostCategoryUpdateDataService();

        const category = await update_category.execute({
            categoryOnPost_id,
            post_id
        });

        return res.json(category);
    }
}

export { PostCategoryUpdateDataController };