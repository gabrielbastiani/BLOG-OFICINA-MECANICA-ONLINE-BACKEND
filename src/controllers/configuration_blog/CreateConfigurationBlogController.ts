import { Request, Response } from 'express';
import { CreateConfigurationBlogService } from '../../services/configuration_blog/CreateConfigurationBlogService'; 

class CreateConfigurationBlogController {
    async handle(req: Request, res: Response) {
        const {
            name_blog, email_blog, logo, phone, description_blog
        } = req.body;

        const create_configuration = new CreateConfigurationBlogService();

        let imageToUpdate = logo;
        if (!logo && req.file) {
            imageToUpdate = req.file.filename;
        }

        const configuration = await create_configuration.execute({
            name_blog,
            description_blog,
            logo: imageToUpdate,
            email_blog,
            phone
        });

        return res.json(configuration);
    }
}

export { CreateConfigurationBlogController };