import { Request, Response } from 'express';
import { TypeConfigurationMarketingDeleteService } from '../../../services/marketing_publication/configuration_marketing/TypeConfigurationMarketingDeleteService';  

class TypeConfigurationMarketingDeleteController {
    async handle(req: Request, res: Response) {

        let { id_delete, name} = req.body;

        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }

        const cinfigurations = new TypeConfigurationMarketingDeleteService();
        const configs = await cinfigurations.execute({ id_delete, name });

        return res.json(configs);
    }
}

export { TypeConfigurationMarketingDeleteController };