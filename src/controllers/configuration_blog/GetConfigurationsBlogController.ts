import { Request, Response } from 'express'
import { GetConfigurationsBlogService } from '../../services/configuration_blog/GetConfigurationsBlogService'; 

class GetConfigurationsBlogController {
    async handle(req: Request, res: Response) {

        const configs = new GetConfigurationsBlogService();

        const blog = await configs.execute();

        return res.json(blog);

    }
}

export { GetConfigurationsBlogController }