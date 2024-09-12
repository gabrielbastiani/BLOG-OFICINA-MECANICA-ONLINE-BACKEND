import { Request, Response } from 'express'
import { CommentDeleteService } from '../../services/comment/CommentDeleteService'; 

class CommentDeleteController {
    async handle(req: Request, res: Response) {

        const comment_id = req.query.comment_id as string;

        const delete_comment = new CommentDeleteService();

        const comment = await delete_comment.execute({ comment_id });

        return res.json(comment);

    }
}

export { CommentDeleteController }