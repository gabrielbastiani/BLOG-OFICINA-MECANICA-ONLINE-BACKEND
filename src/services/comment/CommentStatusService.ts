import prismaClient from '../../prisma';

interface CommentRequest {
    comment_id: string;
    status: string;
}

class CommentStatusService {
    async execute({ comment_id, status }: CommentRequest) {
        const update_status = await prismaClient.comment.update({
            where: {
                id: comment_id
            },
            data: {
                status: status
            }
        });

        return update_status;
    }
}

export { CommentStatusService };