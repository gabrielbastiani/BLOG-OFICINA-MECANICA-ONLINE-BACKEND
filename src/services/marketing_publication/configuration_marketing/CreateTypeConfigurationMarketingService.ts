import prismaClient from "../../../prisma";

interface CreateMarketingPublicationServiceProps {
    name?: string;
    description?: string;
}

class CreateTypeConfigurationMarketingService {
    async execute({
        name,
        description
    }: CreateMarketingPublicationServiceProps) {
        const marketing_publication = await prismaClient.configurationMarketingType.create({
            data: {
                name,
                description
            },
        });

        return marketing_publication;
    }
}

export { CreateTypeConfigurationMarketingService };