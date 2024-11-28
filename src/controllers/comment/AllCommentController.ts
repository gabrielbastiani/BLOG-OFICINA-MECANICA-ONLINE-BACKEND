import { Request, Response } from "express";
import { AllCommentService } from "../../services/comment/AllCommentService"; 
import { Prisma } from "@prisma/client";

class AllCommentController {
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

        const allComment = new AllCommentService();
        const commentes = await allComment.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(commentes);
    }
}

export { AllCommentController };