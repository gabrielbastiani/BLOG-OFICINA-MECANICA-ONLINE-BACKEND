import { Request, Response } from "express";
import { GetNewsletterStatisticsService } from "../../services/dashboard/GetNewsletterStatisticsService";

class GetNewsletterStatisticsController {
    async handle(req: Request, res: Response) {
        const service = new GetNewsletterStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}

export { GetNewsletterStatisticsController };