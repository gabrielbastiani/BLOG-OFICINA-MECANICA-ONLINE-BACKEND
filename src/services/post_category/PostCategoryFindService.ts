import prismaClient from "../../prisma";

interface CategoryPostRequest {
    post_id?: string;
    categoryOnPost_id?: string;
}

class PostCategoryFindService {
    async execute({ post_id, categoryOnPost_id }: CategoryPostRequest) {

        if (post_id) {
            const post_categories = await prismaClient.categoryOnPost.findMany({
                where: {
                    post_id: post_id
                }
            });

            return post_categories;
        }

        if (categoryOnPost_id) {
            const post_category = await prismaClient.categoryOnPost.findUnique({
                where: {
                    id: categoryOnPost_id
                }
            });

            return post_category;
        }

    }
}

export { PostCategoryFindService }