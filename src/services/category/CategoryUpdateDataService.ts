import { StatusCategory } from '@prisma/client';
import prismaClient from '../../prisma';
import fs from 'fs';
import path from 'path';

interface CategoryProps {
    category_id: string;
    name_category?: string;
    description?: string;
    image_category?: string;
    status?: string;
    parentId?: string;
    order?: number;
}

class CategoryUpdateDataService {
    async execute({ category_id, name_category, description, image_category, status, parentId, order }: CategoryProps) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const category = await prismaClient.category.findUnique({
            where: { id: category_id }
        });

        const dataToUpdate: any = {};

        if (name_category) {
            dataToUpdate.name_category = name_category;
            dataToUpdate.slug_name_category = removerAcentos(name_category);
        }

        if (description) {
            dataToUpdate.description = description;
        }

        if (image_category) {
            if (category.image_category) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + category.image_category);
                console.log(`Deleting image: ${imagePath}`);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_category = image_category;
        }

        if (status) {
            dataToUpdate.status = status as StatusCategory;
        }

        if (parentId) {
            dataToUpdate.parentId = parentId;
        }

        if (order) {
            dataToUpdate.order = Number(order);
        }

        const update_category = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: dataToUpdate
        });

        return update_category;
    }
}

export { CategoryUpdateDataService };