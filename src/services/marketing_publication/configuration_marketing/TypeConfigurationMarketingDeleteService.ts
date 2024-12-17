import prismaClient from "../../../prisma";

interface ConfigurationProps {
    id_delete: string[];
}

class TypeConfigurationMarketingDeleteService {
    async execute({ id_delete }: ConfigurationProps) {

        // Remoção dos tipos de configurações do banco de dados
        const deleted_configurations = await prismaClient.configurationMarketingType.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        return deleted_configurations;
    }
}

export { TypeConfigurationMarketingDeleteService };