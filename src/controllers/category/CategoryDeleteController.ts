import { Request, Response } from 'express'
import { CategoryDeleteService } from '../../services/category/CategoryDeleteService'; 

class CategoryDeleteController {
    async handle(req: Request, res: Response) {

        const category_id = req.query.category_id as string;

        const categoryDelete = new CategoryDeleteService();

        const category = await categoryDelete.execute({ category_id });

        return res.json(category);

    }
}

export { CategoryDeleteController }