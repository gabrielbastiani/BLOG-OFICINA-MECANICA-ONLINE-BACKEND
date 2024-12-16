import { Request, Response } from 'express';
import { TypeConfigurationsUpdateDataService } from '../../../services/marketing_publication/configuration_marketing/TypeConfigurationsUpdateDataService'; 

class TypeConfigurationsUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            configurationMarketingType_id,
            name,
            description
        } = req.body;

        const update_configurations = new TypeConfigurationsUpdateDataService();

        const configurations = await update_configurations.execute({
            configurationMarketingType_id,
            name,
            description
        });

        return res.json(configurations);
    }
}

export { TypeConfigurationsUpdateDataController };