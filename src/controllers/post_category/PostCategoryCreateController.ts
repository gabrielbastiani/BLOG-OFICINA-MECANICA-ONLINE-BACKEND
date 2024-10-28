import { Request, Response } from 'express';
import { PostCategoryCreateService } from '../../services/post_category/PostCategoryCreateService'; 

class PostCategoryCreateController {
    async handle(req: Request, res: Response) {
        const {
            post_id, name_category, order
        } = req.body;

        const post_create = new PostCategoryCreateService();

        const post = await post_create.execute({
            post_id, name_category, order
        });

        return res.json(post)

    }
}

export { PostCategoryCreateController }