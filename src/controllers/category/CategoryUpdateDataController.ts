import { Request, Response } from 'express';
import { CategoryUpdateDataService } from '../../services/category/CategoryUpdateDataService';

class CategoryUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            category_id, name_category, description, status, order, parentId
        } = req.body;

        const update_category = new CategoryUpdateDataService();

        let imageToUpdate = req.body.image_category;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const category = await update_category.execute({
            category_id,
            name_category,
            description,
            image_category: imageToUpdate,
            status,
            order,
            parentId
        });

        return res.json(category);
    }
}

export { CategoryUpdateDataController };