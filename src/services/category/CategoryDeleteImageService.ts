import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface CategoryRequest {
    category_id: string;
}

class CategoryDeleteImageService {
    async execute({ category_id }: CategoryRequest) {

        const image_category = await prismaClient.category.findUnique({
            where: {
                id: category_id
            }
        });

        const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + image_category.image_category);
        console.log(`Deleting image: ${imagePath}`);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            } else {
                console.log('Old image deleted successfully');
            }
        });

        const category = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: {
                image_category: ""
            }
        });

        return category;

    }
}

export { CategoryDeleteImageService }