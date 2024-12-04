import { Request, Response } from "express";
import { AllPostService } from "../../services/post/AllPostService";
import { Prisma } from "@prisma/client";
import { validate as isUUID } from 'uuid'; // Importando a função de validação

class AllPostController {
    async handle(req: Request, res: Response) {
        const {
            post_id,
            page = 1,
            limit = 5,
            search = "",
            orderBy = "created_at",
            orderDirection = "desc",
            startDate,
            endDate
        } = req.query;

        // Validar o post_id se for passado
        if (post_id && !isUUID(post_id as string)) {
            return res.status(400).json({ error: "Invalid post_id format" });
        }

        const allPosts = new AllPostService();
        const posts = await allPosts.execute(
            post_id ? String(post_id) : undefined, // Passando post_id apenas se for válido
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