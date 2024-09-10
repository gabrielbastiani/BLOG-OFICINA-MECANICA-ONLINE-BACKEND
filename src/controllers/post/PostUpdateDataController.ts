import { Request, Response } from 'express';
import { PostUpdateDataService } from '../../services/post/PostUpdateDataService'; 

class PostUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            post_id, author, title, status, text_post, tags
        } = req.body;

        const update_post = new PostUpdateDataService();

        let imageToUpdate = req.body.image_post;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const post = await update_post.execute({
            post_id,
            author,
            title,
            image_post: imageToUpdate,
            status,
            text_post,
            tags: tags || []
        });

        return res.json(post);
    }
}

export { PostUpdateDataController };