import { Request, Response } from "express";
import { AllUsersService } from "../../services/user/AllUsersService"; 
import { Prisma } from "@prisma/client";

class AllUserController {
    async handle(req: Request, res: Response) {
        const { 
            page = 1, 
            limit = 5, 
            search = "", 
            orderBy = "created_at", 
            orderDirection = "desc",
            startDate,
            endDate,
            user_id
        } = req.query;

        const allUsers = new AllUsersService();
        const users = await allUsers.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined,
            String(user_id)
        );

        return res.json(users);
    }
}

export { AllUserController };