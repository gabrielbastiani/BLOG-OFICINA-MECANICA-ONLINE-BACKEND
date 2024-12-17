import { Request, Response } from "express";
import { CreateConfigurationMarketingService } from "../../../services/marketing_publication/configuration_marketing/CreateConfigurationMarketingService"; 

class CreateConfigurationMarketingController {
    async handle(req: Request, res: Response) {
        const {
            value,
            description_value,
            configurationMarketingType_id
        } = req.body;

        const createConfiguration = new CreateConfigurationMarketingService();

        const marketing = await createConfiguration.execute({
            value,
            description_value,
            configurationMarketingType_id
        });

        return res.status(201).json(marketing);
    }
}

export { CreateConfigurationMarketingController };