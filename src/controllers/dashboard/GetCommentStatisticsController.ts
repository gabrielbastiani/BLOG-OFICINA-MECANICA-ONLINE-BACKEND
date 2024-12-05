import { Request, Response } from "express";
import { GetCommentStatisticsService } from "../../services/dashboard/GetCommentStatisticsService";

class GetCommentStatisticsController {
    async handle(req: Request, res: Response) {
        const service = new GetCommentStatisticsService();

        try {
            const result = await service.execute();
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching comment statistics" });
        }
    }
}

export { GetCommentStatisticsController };