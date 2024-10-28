import { Request, Response } from 'express'
import { PostCategoryDeleteService } from '../../services/post_category/PostCategoryDeleteService'; 

class PostCategoryDeleteController {
    async handle(req: Request, res: Response) {

        const post_category_id = req.query.post_category_id as string;

        const delete_post_category = new PostCategoryDeleteService();

        const category = await delete_post_category.execute({ post_category_id });

        return res.json(category);

    }
}

export { PostCategoryDeleteController }