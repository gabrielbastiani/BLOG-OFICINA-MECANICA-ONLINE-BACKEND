import { Request, Response } from 'express';
import { PostPagesService } from '../../services/post/PostPagesService'; 

class PostPagesController {
    async handle(req: Request, res: Response) {
        const {
            pagina,
            q,
            post_id
        } = req.query;

        const post_all = new PostPagesService();
        const posts = await post_all.execute({
            page: parseInt(pagina as string) || 1,
            searchQuery: q as string,
            post_id: post_id as string
        });

        return res.json(posts);
    }
}

export { PostPagesController };