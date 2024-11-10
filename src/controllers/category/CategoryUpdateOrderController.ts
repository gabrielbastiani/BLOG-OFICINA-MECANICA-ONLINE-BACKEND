import { Request, Response } from 'express';
import { CategoryUpdateOrderService } from '../../services/category/CategoryUpdateOrderService';

class CategoryUpdateOrderController {
    async handle(req: Request, res: Response) {
        const { categories } = req.body;

        if (!Array.isArray(categories)) {
            return res.status(400).json({ error: "O formato dos dados está incorreto." });
        }

        const updateOrderService = new CategoryUpdateOrderService();
        const result = await updateOrderService.execute(categories);

        return res.json(result);
    }
}

export { CategoryUpdateOrderController };