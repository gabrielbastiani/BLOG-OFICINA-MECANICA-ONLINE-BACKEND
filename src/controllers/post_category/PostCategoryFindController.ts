import { Request, Response } from 'express'
import { PostCategoryFindService } from '../../services/post_category/PostCategoryFindService'; 

class PostCategoryFindController {
    async handle(req: Request, res: Response) {

        const post_id = req.query.post_id as string;
        const categoryOnPost_id = req.query.categoryOnPost_id as string;

        const post_category = new PostCategoryFindService();

        const category = await post_category.execute({ post_id, categoryOnPost_id });

        return res.json(category);

    }
}

export { PostCategoryFindController }