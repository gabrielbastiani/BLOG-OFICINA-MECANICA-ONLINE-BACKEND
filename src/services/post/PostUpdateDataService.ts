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
    publish_at?: Date;
    categories?: string[];
    tags?: string[];
}

class PostUpdateDataService {
    async execute({ post_id, author, title, text_post, image_post, status, publish_at, categories, tags }: PostProps) {

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

        if (publish_at) {
            dataToUpdate.publish_at = publish_at;
        }

        // Atualizar categorias
        if (categories) {
            // Deletar categorias antigas
            await prismaClient.categoryOnPost.deleteMany({
                where: { post_id },
            });

            // Adicionar novas categorias
            const categoryRelations = categories.map((category_id) => ({
                post_id,
                category_id,
            }));

            await prismaClient.categoryOnPost.createMany({
                data: categoryRelations,
            });
        }

        // Atualizar tags
        if (tags) {
            // Deletar tags antigas
            await prismaClient.tagOnPost.deleteMany({
                where: { post_id },
            });

            // Adicionar novas tags
            const tagRelations = tags.map((tag_id) => ({
                post_id,
                tag_id,
            }));

            await prismaClient.tagOnPost.createMany({
                data: tagRelations,
            });
        }

        const updatedPost = await prismaClient.post.update({
            where: { id: post_id },
            data: dataToUpdate,
        });

        return updatedPost;
    }
}

export { PostUpdateDataService };