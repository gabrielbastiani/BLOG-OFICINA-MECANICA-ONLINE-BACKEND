import { Request, Response } from 'express'
import { CommentFindService } from '../../services/comment/CommentFindService'; 

class CommentFindController {
    async handle(req: Request, res: Response) {

        const comment_id = req.query.comment_id as string;

        const comments = new CommentFindService();

        const comment = await comments.execute({ comment_id });

        return res.json(comment);

    }
}

export { CommentFindController }