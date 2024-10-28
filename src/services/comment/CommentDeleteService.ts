import prismaClient from "../../prisma";

interface CommentRequest {
    comment_id: string;
}

class CommentDeleteService {
    async execute({ comment_id }: CommentRequest) {

        const comment_delete = await prismaClient.comment.delete({
            where: {
                id: comment_id
            }
        });

        return comment_delete;

    }
}

export { CommentDeleteService }