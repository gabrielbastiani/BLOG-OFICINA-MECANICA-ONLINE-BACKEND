import { Request, Response } from 'express'
import { CommentStatusService } from '../../services/comment/CommentStatusService'; 

class CommentStatusController {
    async handle(req: Request, res: Response) {

        const comment_id = req.query.comment_id as string;

        const { status } = req.body;

        const comment_status = new CommentStatusService();

        const status_comment = await comment_status.execute({ comment_id, status });

        return res.json(status_comment);

    }
}

export { CommentStatusController }