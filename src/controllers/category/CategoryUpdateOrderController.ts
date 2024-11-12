import { Request, Response } from 'express';
import { CategoryUpdateOrderService } from '../../services/category/CategoryUpdateOrderService';

class CategoryUpdateOrderController {
    async handle(req: Request, res: Response) {
        const { categoryId, parentId, order } = req.body;
        const categoriesService = new CategoryUpdateOrderService();

        try {
            const updatedCategory = await categoriesService.execute(categoryId, parentId, order);
            return res.json(updatedCategory);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar a categoria.", error });
        }
    }
}

export { CategoryUpdateOrderController };