import { Request, Response } from 'express';
import { PostCreateService } from '../../services/post/PostCreateService';

class PostCreateController {
  async handle(req: Request, res: Response) {
    const {
      author, title, text_post, tags, categories, publish_at
    } = req.body;

    const create_post = new PostCreateService();

    let imageToUpdate = req.body.image_post;
    if (!req.body.image_post && req.file) {
      imageToUpdate = req.file.filename;
    }

    const post = await create_post.execute({
      author,
      title,
      text_post,
      image_post: imageToUpdate,
      status: req.body.status || "Disponivel", // Valor padrão
      publish_at: publish_at ? new Date(publish_at) : undefined, // Converter para Date
      tags,
      categories
    });

    return res.json(post);
  }
}

export { PostCreateController };