import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface PostRequest {
    post_id: string;
    user_id: string;
}

class PostDeleteService {
    async execute({ post_id, user_id }: PostRequest) {

        const post_data = await prismaClient.post.findUnique({
            where: {
                id: post_id
            }
        });

        const user_data = await prismaClient.user.findUnique({
            where: {
                id: user_id
            }
        });

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

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: `Post de titulo ${post_data.title} deletado pelo usuário ${user_data.name}`,
            type: "post"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + post_data.image_post);
        console.log(`Deleting image: ${imagePath}`);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            } else {
                console.log('Old image deleted successfully');
            }
        });

        const post = await prismaClient.post.delete({
            where: {
                id: post_id
            }
        });

        return post;

    }
}

export { PostDeleteService }