import { Request, Response } from "express";
import { AllUsersBlogService } from "../../../services/user/user_blog/AllUsersBlogService";  
import { Prisma } from "@prisma/client";

class AllUserBlogController {
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

        const allUsers = new AllUsersBlogService();
        const users = await allUsers.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(users);
    }
}

export { AllUserBlogController };