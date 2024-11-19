import { Request, Response } from "express";
import { AllTagsService } from "../../services/tag/AllTagsService"; 
import { Prisma } from "@prisma/client";

class AllTagController {
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

        const allTags = new AllTagsService();
        const tags = await allTags.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(tags);
    }
}

export { AllTagController };