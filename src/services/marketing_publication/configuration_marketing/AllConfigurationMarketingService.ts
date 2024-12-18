import prismaClient from "../../../prisma";

class AllConfigurationMarketingService {
    async execute() {
        const marketing_publication = await prismaClient.configurationMarketingType.findMany();

        return marketing_publication;
    }
}

export { AllConfigurationMarketingService };