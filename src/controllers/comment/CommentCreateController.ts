import { Request, Response } from 'express';
import { CommentCreateService } from '../../services/comment/CommentCreateService';

class CommentCreateController {
    async handle(req: Request, res: Response) {
        try {
            const { post_id, userBlog_id, comment, parentId } = req.body;

            const create_comment = new CommentCreateService();
            const comments = await create_comment.execute({ post_id, userBlog_id, comment, parentId });

            return res.status(201).json(comments);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CommentCreateController }