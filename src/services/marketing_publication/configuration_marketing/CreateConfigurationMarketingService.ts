import prismaClient from "../../../prisma";

interface ConfigurationProps {
    value: string;
    description?: string;
    configurationMarketingType_id: string;
}

class CreateConfigurationMarketingService {
    async execute({
        value,
        description,
        configurationMarketingType_id
    }: ConfigurationProps) {
        const marketing_publication = await prismaClient.configurationMarketingConfiguration.create({
            data: {
                value,
                description,
                configurationMarketingType_id
            },
        });

        return marketing_publication;
    }
}

export { CreateConfigurationMarketingService };