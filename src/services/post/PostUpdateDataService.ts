import { StatusPost } from '@prisma/client';
import prismaClient from '../../prisma';
import fs from 'fs';
import path from 'path';

interface PostProps {
    post_id: string;
    author?: string;
    title?: string;
    text_post?: string;
    image_post?: string;
    status?: string;
}

class PostUpdateDataService {
    async execute({ post_id, author, title, text_post, image_post, status }: PostProps) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const post = await prismaClient.post.findUnique({
            where: { id: post_id }
        });

        const dataToUpdate: any = {};

        if (author) {
            dataToUpdate.author = author;
        }

        if (title) {
            dataToUpdate.title = title;
            dataToUpdate.slug_title_post = removerAcentos(title);
        }

        if (image_post) {
            if (post.image_post) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + post.image_post);
                console.log(`Deleting image: ${imagePath}`);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_post = image_post;
        }

        if (status) {
            dataToUpdate.status = status as StatusPost;
        }

        if (text_post) {
            dataToUpdate.text_post = text_post;
        }

        const update_post = await prismaClient.post.update({
            where: {
                id: post_id
            },
            data: dataToUpdate
        });

        return update_post;
    }
}

export { PostUpdateDataService };