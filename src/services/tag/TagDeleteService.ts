import prismaClient from "../../prisma";

interface TagProps {
    id_delete: string[];
}

class TagDeleteService {
    async execute({ id_delete }: TagProps) {
        const deleteTags = await prismaClient.tag.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        return deleteTags;
    }
}

export { TagDeleteService };