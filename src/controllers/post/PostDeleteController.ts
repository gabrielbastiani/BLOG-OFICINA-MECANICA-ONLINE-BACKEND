import { Request, Response } from 'express'
import { PostDeleteService } from '../../services/post/PostDeleteService';  

class PostDeleteController {
    async handle(req: Request, res: Response) {

        const post_id = req.query.post_id as string;

        const post_delete = new PostDeleteService();

        const post = await post_delete.execute({ post_id });

        return res.json(post);

    }
}

export { PostDeleteController }