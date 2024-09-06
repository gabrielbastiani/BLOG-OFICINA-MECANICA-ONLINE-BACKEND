import { Request, Response } from 'express';
import { PostCreateService } from '../../services/post/PostCreateService';

class PostCreateController {
    async handle(req: Request, res: Response) {
        const {
            author, title, image_post, text_post, tags
        } = req.body;

        const create_post = new PostCreateService();

        let imageToUpdate = image_post;
        if (!image_post && req.file) {
            imageToUpdate = req.file.filename;
        }

        const post = await create_post.execute({
            author,
            title,
            text_post,
            image_post: imageToUpdate,
            tags
        });

        return res.json(post)

    }
}

export { PostCreateController }