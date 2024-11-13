import { Request, Response } from "express";
import { MoveCategoryUpService } from "../../services/category/MoveCategoryUpService";

class MoveCategoryUpController {
    async handle(req: Request, res: Response) {
        const { categoryId } = req.body;
        const service = new MoveCategoryUpService();
        try {
            await service.moveCategoryUp(categoryId);
            return res.status(200).json({ message: "Categoria movida para cima com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao mover a categoria para cima" });
        }
    }

}

export { MoveCategoryUpController }