import prismaClient from "../../prisma";

interface CategoryPostRequest {
    post_category_id: string;
}

class PostCategoryDeleteService {
    async execute({ post_category_id }: CategoryPostRequest) {

        const post_category_delete = await prismaClient.post_category.delete({
            where: {
                id: post_category_id
            }
        });

        return post_category_delete;

    }
}

export { PostCategoryDeleteService }