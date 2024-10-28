import prismaClient from "../../prisma";

interface CommentRequest {
    comment_id?: string;
}

class CommentFindService {
    async execute({ comment_id }: CommentRequest) {

        if (comment_id) {
            const comment_all = await prismaClient.comment.findMany({
                where: {
                    id: comment_id
                }
            });

            return comment_all;
        }

    }
}

export { CommentFindService }