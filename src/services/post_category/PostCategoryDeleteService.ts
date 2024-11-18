import prismaClient from "../../prisma";

interface CategoryPostRequest {
    categoryOnPost_id: string;
}

class PostCategoryDeleteService {
    async execute({ categoryOnPost_id }: CategoryPostRequest) {

        const post_category_delete = await prismaClient.categoryOnPost.delete({
            where: {
                id: categoryOnPost_id
            }
        });

        return post_category_delete;

    }
}

export { PostCategoryDeleteService }