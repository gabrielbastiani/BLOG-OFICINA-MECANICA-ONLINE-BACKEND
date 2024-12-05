import { Request, Response } from "express"; // Corrija a importação do Request
import { UpdateViewsService } from "../../services/post/UpdateViewsService";

class UpdateViewsController {
    async handle(req: Request, res: Response) {
        const { post_id } = req.params;

        const service = new UpdateViewsService();

        try {
            const updatedPost = await service.execute({ post_id, req });
            return res.json(updatedPost);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { UpdateViewsController };