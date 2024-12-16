import prismaClient from '../../../prisma'; 

interface ConfigsProps {
    configurationMarketingType_id: string;
    name?: string;
    description?: string;
}

class TypeConfigurationsUpdateDataService {
    async execute({
        configurationMarketingType_id,
        name,
        description
    }: ConfigsProps) {

        const dataToUpdate: any = {};

        if (name) {
            dataToUpdate.name = name;
        }

        if (description) {
            dataToUpdate.description = description;
        }

        const update_configuration = await prismaClient.configurationMarketingType.update({
            where: {
                id: configurationMarketingType_id
            },
            data: dataToUpdate
        });

        return update_configuration;
    }
}

export { TypeConfigurationsUpdateDataService };