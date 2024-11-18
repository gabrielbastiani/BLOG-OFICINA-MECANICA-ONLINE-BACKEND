import prismaClient from "../../prisma";

interface TagProps {
    tag_name: string;
}

class CreateTagService {
    async execute({ tag_name }: TagProps) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const tags = await prismaClient.tag.create({
            data: {
                tag_name: tag_name,
                slug_tag_name: removerAcentos(tag_name)
            }
        });

        return tags;

    }
}

export { CreateTagService }