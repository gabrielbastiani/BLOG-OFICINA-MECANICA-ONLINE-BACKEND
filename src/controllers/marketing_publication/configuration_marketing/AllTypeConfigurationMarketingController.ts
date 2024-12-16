import { Request, Response } from "express";
import { AllTypeConfigurationMarketingService } from "../../../services/marketing_publication/configuration_marketing/AllTypeConfigurationMarketingService";  
import { Prisma } from "@prisma/client";

class AllTypeConfigurationMarketingController {
    async handle(req: Request, res: Response) {
        const { 
            page = 1, 
            configurationMarketingType_id,
            limit = 5, 
            search = "", 
            orderBy = "created_at", 
            orderDirection = "desc",
            startDate,
            endDate
        } = req.query;

        const allConfigurations = new AllTypeConfigurationMarketingService();
        const configurations = await allConfigurations.execute(
            configurationMarketingType_id ? String(configurationMarketingType_id) : undefined,
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(configurations);
    }
}

export { AllTypeConfigurationMarketingController };