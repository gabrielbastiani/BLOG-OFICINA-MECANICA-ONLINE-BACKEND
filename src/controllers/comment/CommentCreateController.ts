import { Request, Response } from 'express';
import { CommentCreateService } from '../../services/comment/CommentCreateService';

class CommentCreateController {
    async handle(req: Request, res: Response) {
        const {
            post_id,
            userBlog_id,
            comment,
            parentId,
            nivel
        } = req.body;

        const create_comment = new CommentCreateService();

        const comments = await create_comment.execute({
            post_id,
            userBlog_id,
            comment,
            parentId,
            nivel
        });

        return res.json(comments)

    }
}

export { CommentCreateController }