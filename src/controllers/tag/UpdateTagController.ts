import { Request, Response } from 'express';
import { UpdateTagService } from '../../services/tag/UpdateTagService'; 

class UpdateTagController {
    async handle(req: Request, res: Response) {
        const {
            tag_id,
            tag_name
        } = req.body;

        const tags = new UpdateTagService();

        const tag = await tags.execute({
            tag_id,
            tag_name
        });

        return res.json(tag)

    }
}

export { UpdateTagController }