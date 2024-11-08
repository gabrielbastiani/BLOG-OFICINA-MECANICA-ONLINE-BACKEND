import { Request, Response } from "express";
import { NewsletterFindService } from "../../services/newsletter/NewsletterFindService"; 
import { Prisma } from "@prisma/client";

class NewsletterFindController {
    async handle(req: Request, res: Response) {
        const { 
            page = 1, 
            limit = 5, 
            search = "", 
            orderBy = "created_at", 
            orderDirection = "desc",
            startDate,
            endDate
        } = req.query;

        const allnewslatter = new NewsletterFindService();
        const newslatter = await allnewslatter.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(newslatter);
    }
}

export { NewsletterFindController };