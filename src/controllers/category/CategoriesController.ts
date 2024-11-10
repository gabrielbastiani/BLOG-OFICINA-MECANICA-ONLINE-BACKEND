import { Request, Response } from 'express';
import { CategoriesService } from '../../services/category/CategoriesService';

class CategoriesController {
  async handle(req: Request, res: Response) {
    const categoriesService = new CategoriesService();
    const categories = await categoriesService.execute();

    return res.json(categories);
  }
}

export { CategoriesController };