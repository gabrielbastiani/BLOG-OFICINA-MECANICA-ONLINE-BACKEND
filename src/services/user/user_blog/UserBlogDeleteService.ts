import prismaClient from "../../../prisma";
import fs from 'fs';
import path from 'path';

interface UserRequest {
    id_delete: string[];
    name?: string;
    user_id?: string;
}

class UserBlogDeleteService {
    async execute({ id_delete, name, user_id }: UserRequest) {

        const users = await prismaClient.userBlog.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        users.forEach((userBlog) => {
            if (userBlog.image_user) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + userBlog.image_user);
                console.log(`Deleting image: ${imagePath}`);

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for userBlog ${userBlog.id}: ${err.message}`);
                    } else {
                        console.log(`Image for userBlog ${userBlog.id} deleted successfully`);
                    }
                });
            }
        });

        const deletedUsers = await prismaClient.userBlog.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        await prismaClient.notificationUser.createMany({
            data: users.map((user) => ({
                user_id: user_id,
                message: `Usuário do blog ${user.name} foi deletado pelo usuário ${name}.`,
                type: "user"
            }))
        });

        return deletedUsers;
    }
}

export { UserBlogDeleteService };