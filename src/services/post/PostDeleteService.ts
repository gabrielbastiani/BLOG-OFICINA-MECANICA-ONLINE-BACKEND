import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface PostRequest {
    post_id: string;
}

class PostDeleteService {
    async execute({ post_id }: PostRequest) {

        const post_data = await prismaClient.post.findUnique({
            where: {
                id: post_id
            }
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