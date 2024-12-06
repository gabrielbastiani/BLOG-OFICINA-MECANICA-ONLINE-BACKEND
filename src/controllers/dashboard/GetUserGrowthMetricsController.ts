import { Request, Response } from 'express';
import { GetUserGrowthMetricsService } from '../../services/dashboard/GetUserGrowthMetricsService'; 

class GetUserGrowthMetricsController {
    async handle(req: Request, res: Response) {
        const service = new GetUserGrowthMetricsService();
        const data = await service.execute();
        return res.json(data);
    }
}

export { GetUserGrowthMetricsController };