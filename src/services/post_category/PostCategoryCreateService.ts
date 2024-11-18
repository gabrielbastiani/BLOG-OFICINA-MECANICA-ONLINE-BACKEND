import prismaClient from "../../prisma";

interface CategoryPostRequest {
    post_id: string;
    category_id: string;
}

class PostCategoryCreateService {
    async execute({ post_id, category_id }: CategoryPostRequest) {
        const post = await prismaClient.categoryOnPost.create({
            data: {
                post_id: post_id,
                category_id: category_id
            }
        });

        return post;

    }
}

export { PostCategoryCreateService }