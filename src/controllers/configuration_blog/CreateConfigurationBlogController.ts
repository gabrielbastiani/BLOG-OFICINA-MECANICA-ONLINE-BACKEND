import { Request, Response } from 'express';
import { CreateConfigurationBlogService } from '../../services/marketing_publication/CreateConfigurationBlogService';

class CreateConfigurationBlogController {
    async handle(req: Request, res: Response) {
        const {
            name,
            logo,
            description_blog
        } = req.body;

        const create_configuration = new CreateConfigurationBlogService();

        let imageToUpdate = logo;
        if (!logo && req.file) {
            imageToUpdate = req.file.filename;
        }

        const configuration = await create_configuration.execute({
            name,
            description_blog,
            logo: imageToUpdate
        });

        return res.json(configuration);
    }
}

export { CreateConfigurationBlogController };