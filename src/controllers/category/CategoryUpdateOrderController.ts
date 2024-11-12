import { Request, Response } from "express";
import { CategoryUpdateOrderService } from "../../services/category/CategoryUpdateOrderService";

class CategoryUpdateOrderController {
    async handle(req: Request, res: Response) {
        const { draggedId, targetId } = req.body;

        const updateCategoryOrderService = new CategoryUpdateOrderService();
        const updatedCategory = await updateCategoryOrderService.execute({ draggedId, targetId });

        return res.json(updatedCategory);
    }
}

export { CategoryUpdateOrderController };