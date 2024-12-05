import { Request, Response } from "express";
import { GetPostStatisticsService } from "../../services/dashboard/GetPostStatisticsService";

class GetPostStatisticsController {
    async handle(req: Request, res: Response) {
        const service = new GetPostStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}

export { GetPostStatisticsController };