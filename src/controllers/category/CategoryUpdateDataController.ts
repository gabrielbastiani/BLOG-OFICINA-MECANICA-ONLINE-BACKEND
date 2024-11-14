import { Request, Response } from 'express';
import { CategoryUpdateDataService } from '../../services/category/CategoryUpdateDataService';

class CategoryUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            category_id, name_category, description, status, parentId, order
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
            parentId,
            order
        });

        return res.json(category);
    }
}

export { CategoryUpdateDataController };