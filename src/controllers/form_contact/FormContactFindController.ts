import { Request, Response } from "express";
import { FormContactFindService } from "../../services/form_contact/FormContactFindService";
import { Prisma } from "@prisma/client";

class FormContactFindController {
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

        const allContacts = new FormContactFindService();
        const contacts = await allContacts.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(contacts);
    }
}

export { FormContactFindController };