import { Request, Response } from 'express';
import { CategoryCreateService } from '../../services/category/CategoryCreateService';

class CategoryCreateController {
    async handle(req: Request, res: Response) {
        const {
            name_category,
            description,
            image_category
        } = req.body;

        const create_category = new CategoryCreateService();

        let imageToUpdate = image_category;
        if (!image_category && req.file) {
            imageToUpdate = req.file.filename;
        }

        const category = await create_category.execute({
            name_category,
            description,
            image_category: imageToUpdate
        });

        return res.json(category)

    }
}

export { CategoryCreateController }