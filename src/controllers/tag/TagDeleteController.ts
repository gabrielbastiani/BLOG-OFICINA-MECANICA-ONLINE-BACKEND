import { Request, Response } from 'express';
import { TagDeleteService } from '../../services/tag/TagDeleteService'; 

class TagDeleteController {
    async handle(req: Request, res: Response) {
        const { id_delete } = req.body;

        const tagService = new TagDeleteService();

        const tagDelete = await tagService.execute({
            id_delete
        });

        return res.json(tagDelete);
    }
}

export { TagDeleteController };