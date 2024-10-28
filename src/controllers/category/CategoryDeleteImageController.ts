import { Request, Response } from 'express'
import { CategoryDeleteImageService } from '../../services/category/CategoryDeleteImageService'; 

class CategoryDeleteImageController {
    async handle(req: Request, res: Response) {

        const category_id = req.query.category_id as string;

        const delete_image = new CategoryDeleteImageService();

        const category = await delete_image.execute({ category_id });

        return res.json(category);

    }
}

export { CategoryDeleteImageController }