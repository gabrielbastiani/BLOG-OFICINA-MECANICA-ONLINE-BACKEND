import { Request, Response } from "express";
import { GetContactStatisticsService } from "../../services/dashboard/GetContactStatisticsService";

class GetContactStatisticsController {
    async handle(req: Request, res: Response) {
        const service = new GetContactStatisticsService();

        try {
            const result = await service.execute();
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching contact statistics" });
        }
    }
}

export { GetContactStatisticsController };