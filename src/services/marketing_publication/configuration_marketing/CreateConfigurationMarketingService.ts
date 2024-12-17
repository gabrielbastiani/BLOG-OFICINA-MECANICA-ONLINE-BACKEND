import prismaClient from "../../../prisma";

interface ConfigurationProps {
    value: string;
    description_value?: string;
    configurationMarketingType_id: string;
}

class CreateConfigurationMarketingService {
    async execute({
        value,
        description_value,
        configurationMarketingType_id
    }: ConfigurationProps) {
        const marketing_publication = await prismaClient.configurationMarketingConfiguration.create({
            data: {
                value,
                description_value,
                configurationMarketingType_id
            },
        });

        return marketing_publication;
    }
}

export { CreateConfigurationMarketingService };