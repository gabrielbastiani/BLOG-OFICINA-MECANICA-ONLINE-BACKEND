import { Request, Response } from 'express';
import { CategoryDeleteService } from '../../services/category/CategoryDeleteService'; 

class CategoryDeleteController {
    async handle(req: Request, res: Response) {

        let { id_delete, name} = req.body;

        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }

        const detail_category = new CategoryDeleteService();
        const category = await detail_category.execute({ id_delete, name });

        return res.json(category);
    }
}

export { CategoryDeleteController };