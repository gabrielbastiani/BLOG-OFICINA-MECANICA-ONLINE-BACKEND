import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface UserRequest {
    id_delete: string[];
    name?: string;
    user_id?: string;
}

class UserDeleteService {
    async execute({ id_delete, name, user_id }: UserRequest) {

        const users = await prismaClient.user.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

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

        const deletedUsers = await prismaClient.user.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        await prismaClient.notificationUser.createMany({
            data: users.map((user) => ({
                user_id: user_id,
                message: `Usuário ${user.name} foi deletado pelo usuário ${name}.`,
                type: "user"
            }))
        });

        return deletedUsers;
    }
}

export { UserDeleteService };