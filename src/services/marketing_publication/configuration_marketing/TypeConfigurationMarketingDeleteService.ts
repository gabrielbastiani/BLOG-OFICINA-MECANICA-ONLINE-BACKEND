import { RoleUser } from "@prisma/client";
import prismaClient from "../../../prisma";

interface ConfigurationProps {
    id_delete: string[];
    name?: string;
}

class TypeConfigurationMarketingDeleteService {
    async execute({ id_delete, name }: ConfigurationProps) {

        const configurations = await prismaClient.configurationMarketingType.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        // Remoção das categorias do banco de dados
        const deleted_configurations = await prismaClient.configurationMarketingType.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        // Busca de IDs dos usuários SUPER_ADMIN e ADMIN
        const users_superAdmins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        const users_admins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.ADMIN
            }
        });

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];

        // Criação de notificações para cada publicidade deletada e cada usuário
        await prismaClient.notificationUser.createMany({
            data: configurations.flatMap((configurationMarketingType) =>
                all_user_ids.map((user_id) => ({
                    user_id,
                    message: `Configuração ${configurationMarketingType.name} foi deletada(s) pelo usuário ${name}.`,
                    type: "marketing"
                }))
            )
        });

        return deleted_configurations;
    }
}

export { TypeConfigurationMarketingDeleteService };