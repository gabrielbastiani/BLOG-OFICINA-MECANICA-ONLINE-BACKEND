import { Request, Response } from "express";
import { MoveCategoryDownService } from "../../services/category/MoveCategoryDownService";

class MoveCategoryDownController {
    async handle(req: Request, res: Response) {
        const { categoryId } = req.body;
        const service = new MoveCategoryDownService();
        try {
            await service.moveCategoryDown(categoryId);
            return res.status(200).json({ message: "Categoria movida para baixo com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao mover a categoria para baixo" });
        }
    }

}

export { MoveCategoryDownController }