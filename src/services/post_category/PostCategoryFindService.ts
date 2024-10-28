import prismaClient from "../../prisma";

interface CategoryPostRequest {
    post_id?: string;
    post_category_id?: string;
}

class PostCategoryFindService {
    async execute({ post_id, post_category_id }: CategoryPostRequest) {

        if (post_id) {
            const post_categories = await prismaClient.post_category.findMany({
                where: {
                    post_id: post_id
                }
            });

            return post_categories;
        }

        if (post_category_id) {
            const post_category = await prismaClient.post_category.findUnique({
                where: {
                    id: post_category_id
                }
            });

            return post_category;
        }

    }
}

export { PostCategoryFindService }