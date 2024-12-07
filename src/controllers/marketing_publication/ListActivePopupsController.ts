import { Request, Response } from "express";
import { ListActivePopupsService } from "../../services/marketing_publication/ListActivePopupsService"; 

class ListActivePopupsController {
    async handle(req: Request, res: Response) {
        const service = new ListActivePopupsService();
        const popups = await service.execute();
        return res.status(200).json(popups);
    }
}

export { ListActivePopupsController };