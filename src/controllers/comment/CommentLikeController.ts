import { Request, Response } from "express";
import { CommentLikeService } from "../../services/comment/CommentLikeService";

class CommentLikeController {
    async handle(req: Request, res: Response) {
        const { comment_id, userBlog_id, isLike } = req.body;

        const commentLikeService = new CommentLikeService();

        const result = await commentLikeService.execute({
            comment_id,
            userBlog_id,
            isLike: isLike === "true", // Converter para boolean
        });

        return res.json(result);
    }
}

export { CommentLikeController };