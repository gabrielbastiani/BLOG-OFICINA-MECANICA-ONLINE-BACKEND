import prismaClient from "../../prisma";

interface PostRequest {
    title: string;
    image_post?: string;
    text_post: string;
    tags?: string[];
    categories?: string[];
}

class PostCreateService {
    async execute({ title, image_post, text_post, tags, categories }: PostRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const post = await prismaClient.post.create({
            data: {
                title: title,
                slug_title_post: removerAcentos(title),
                image_post: image_post,
                text_post: text_post,
                tags: { tags },
                categories: { categories }
            }
        });

        return post;

    }
}

export { PostCreateService }