import { MainCategoryPost, StatusCategory } from '@prisma/client';
import prismaClient from '../../prisma';

interface PostCategoryProps {
    post_category_id: string;
    name_category?: string;
    status?: string;
    main_category?: string;
    order?: number;
}

class PostCategoryUpdateDataService {
    async execute({ post_category_id, name_category, status, order, main_category }: PostCategoryProps) {

        const dataToUpdate: any = {};

        if (name_category) {
            dataToUpdate.name_category = name_category;
        }

        if (status) {
            dataToUpdate.status = status as StatusCategory;
        }

        if (order) {
            dataToUpdate.order = Number(order);
        }

        if (main_category) {
            dataToUpdate.main_category = main_category as MainCategoryPost;
        }

        const update_category = await prismaClient.post_category.update({
            where: {
                id: post_category_id
            },
            data: dataToUpdate
        });

        return update_category;
    }
}

export { PostCategoryUpdateDataService };