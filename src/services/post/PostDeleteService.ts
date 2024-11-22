import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface PostProps {
    id_delete: string[];
    name?: string;
}

class PostDeleteService {
    async execute({ id_delete, name }: PostProps) {

        const posts = await prismaClient.post.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        posts.forEach((post) => {
            if (post.image_post) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + post.image_post);
                console.log(`Deleting image: ${imagePath}`);

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for post ${post.id}: ${err.message}`);
                    } else {
                        console.log(`Image for post ${post.id} deleted successfully`);
                    }
                });
            }
        });

        const deleted_posts = await prismaClient.post.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
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

        await prismaClient.notificationUser.createMany({
            data: posts.flatMap((post) =>
                all_user_ids.map((user_id) => ({
                    user_id,
                    message: `Post(s) ${post.title} foi deletada(s) pelo usuário ${name}.`,
                    type: "post"
                }))
            )
        });

        return deleted_posts;
    }
}

export { PostDeleteService };