import { StatusCategory } from '@prisma/client';
import prismaClient from '../../prisma';

interface PostCategoryProps {
    categoryOnPost_id: string;
    post_id?: string;
}

class PostCategoryUpdateDataService {
    async execute({categoryOnPost_id, post_id }: PostCategoryProps) {

        const dataToUpdate: any = {};

        if (post_id) {
            dataToUpdate.post_id = post_id;
        }

        const update_category = await prismaClient.categoryOnPost.update({
            where: {
                id:categoryOnPost_id
            },
            data: dataToUpdate
        });

        return update_category;
    }
}

export { PostCategoryUpdateDataService };