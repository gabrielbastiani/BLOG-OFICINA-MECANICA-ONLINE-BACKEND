import { Request, Response } from "express";
import { AllPostService } from "../../services/post/AllPostService"; 
import { Prisma } from "@prisma/client";

class AllPostController {
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

        const allPosts = new AllPostService();
        const posts = await allPosts.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(posts);
    }
}

export { AllPostController };