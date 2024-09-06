import { Request, Response } from 'express';
import { PostCreateService } from '../../services/post/PostCreateService';

class PostCreateController {
    async handle(req: Request, res: Response) {
        const {
            title, image_post, text_post, tags, categories
        } = req.body;

        const create_post = new PostCreateService();

        let imageToUpdate = image_post;
        if (!image_post && req.file) {
            imageToUpdate = req.file.filename;
        }

        const post = await create_post.execute({
            title,
            text_post,
            image_post: imageToUpdate,
            tags,
            categories
        });

        return res.json(post)

    }
}

export { PostCreateController }