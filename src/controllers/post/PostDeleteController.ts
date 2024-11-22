import { Request, Response } from 'express'
import { PostDeleteService } from '../../services/post/PostDeleteService';  

class PostDeleteController {
    async handle(req: Request, res: Response) {

        let { id_delete, name } = req.body;

        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }

        const post_delete = new PostDeleteService();

        const post = await post_delete.execute({ id_delete, name });

        return res.json(post);

    }
}

export { PostDeleteController }