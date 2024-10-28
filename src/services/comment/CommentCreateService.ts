import prismaClient from "../../prisma";

interface CommentRequest {
    post_id: string;
    author: string;
    comment: string;
    parentId?: string;
    nivel?: number;
}

class CommentCreateService {
    async execute({ post_id, author, comment, parentId, nivel }: CommentRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const comment_create = await prismaClient.comment.create({
            data: {
                post_id: post_id,
                author: author,
                slug_author: removerAcentos(author),
                comment: comment,
                parentId: parentId,
                nivel: Number(nivel)
            }
        });

        return comment_create;

    }
}

export { CommentCreateService }