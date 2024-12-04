import { Request, Response } from "express";
import { PostLikeService } from "../../services/post/PostLikeService"; 

class PostLikeController {
    async handle(req: Request, res: Response) {
        const { post_id, userBlog_id, isLike } = req.body;

        const postServicelikes = new PostLikeService();

        const result = await postServicelikes.execute({
            post_id,
            userBlog_id,
            isLike: isLike === true || isLike === "true",
        });

        return res.json(result);
    }
}

export { PostLikeController };