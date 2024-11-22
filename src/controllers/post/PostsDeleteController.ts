import { Request, Response } from 'express';
import { PostDeleteService } from '../../services/post/PostDeleteService'; 

class PostsDeleteController {
    async handle(req: Request, res: Response) {

        let { id_delete, name} = req.body;

        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }

        const detail_post = new PostDeleteService();
        const posts = await detail_post.execute({ id_delete, name });

        return res.json(posts);
    }
}

export { PostsDeleteController };