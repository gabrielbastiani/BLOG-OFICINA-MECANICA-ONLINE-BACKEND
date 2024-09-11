import prismaClient from "../../prisma";

interface CategoryPostRequest {
    post_id: string;
    name_category: string;
    order?: number;
}

class PostCategoryCreateService {
    async execute({ post_id, name_category, order }: CategoryPostRequest) {

        console.log(post_id)

        const post = await prismaClient.post_category.create({
            data: {
                post_id: post_id,
                name_category: name_category,
                order: Number(order)
            }
        });

        return post;

    }
}

export { PostCategoryCreateService }