import { Request, Response } from 'express';
import { CreateTagService } from '../../services/tag/CreateTagService'; 

class CreateTagController {
    async handle(req: Request, res: Response) {
        const {
            tag_name
        } = req.body;

        const tags = new CreateTagService();

        const tag = await tags.execute({
            tag_name
        });

        return res.json(tag)

    }
}

export { CreateTagController }