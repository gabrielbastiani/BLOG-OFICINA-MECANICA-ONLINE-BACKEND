import { Request, Response } from "express";
import { GetCategoryStatisticsService } from "../../services/dashboard/GetCategoryStatisticsService";

class GetCategoryStatisticsController {
    async handle(req: Request, res: Response) {
        const service = new GetCategoryStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}

export { GetCategoryStatisticsController };