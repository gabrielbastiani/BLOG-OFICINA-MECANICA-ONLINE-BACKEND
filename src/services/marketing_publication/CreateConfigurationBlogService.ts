import prismaClient from "../../prisma";

interface ConfigurationBlog {
    name: string;
    logo: string;
    description_blog?: string;
}

class CreateConfigurationBlogService {
    async execute({ name, logo, description_blog }: ConfigurationBlog) {
        if (!name) {
            throw new Error("O nome do blog é obrigatório.");
        }

        if (!logo) {
            throw new Error("O logo do blog é obrigatório.");
        }

        const configurationBlog = await prismaClient.configurationBlog.create({
            data: {
                name,
                logo: logo,
                description_blog: description_blog
            }
        });

        return configurationBlog;
    }
}

export { CreateConfigurationBlogService };