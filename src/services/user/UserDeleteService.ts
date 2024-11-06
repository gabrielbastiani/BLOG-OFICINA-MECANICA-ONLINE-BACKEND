import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface UserRequest {
    id_delete: string[];
    name?: string;
}

class UserDeleteService {
    async execute({ id_delete, name }: UserRequest) {

        const users = await prismaClient.user.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        // Criação de notificações para cada usuário deletado
        await prismaClient.notificationUser.createMany({
            data: users.map((user) => ({
                user_id: user.id,
                message: `Usuário ${user.name} foi deletado pelo usuário ${name}.`,
                type: "user"
            }))
        });

        // Deleção das imagens associadas aos usuários
        users.forEach((user) => {
            if (user.image_user) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + user.image_user);
                console.log(`Deleting image: ${imagePath}`);

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for user ${user.id}: ${err.message}`);
                    } else {
                        console.log(`Image for user ${user.id} deleted successfully`);
                    }
                });
            }
        });

        // Remoção dos usuários do banco de dados
        const deletedUsers = await prismaClient.user.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        return deletedUsers;
    }
}

export { UserDeleteService };