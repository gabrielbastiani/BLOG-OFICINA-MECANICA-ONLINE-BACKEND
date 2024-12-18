import { Request, Response } from "express";
import { AllConfigurationMarketingService } from "../../../services/marketing_publication/configuration_marketing/AllConfigurationMarketingService"; 

class AllConfigurationMarketingController {
    async handle(req: Request, res: Response) {

        const configs = new AllConfigurationMarketingService();

        const marketing = await configs.execute();

        return res.status(201).json(marketing);
    }
}

export { AllConfigurationMarketingController };