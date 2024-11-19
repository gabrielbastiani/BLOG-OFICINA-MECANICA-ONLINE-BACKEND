import prismaClient from "../../prisma";

interface TagProps {
    tag_id: string;
    tag_name: string;
}

class UpdateTagService {
    async execute({ tag_name, tag_id }: TagProps) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const tags = await prismaClient.tag.update({
            where: {
                id: tag_id
            },
            data: {
                tag_name: tag_name,
                slug_tag_name: removerAcentos(tag_name)
            }
        });

        return tags;

    }
}

export { UpdateTagService }