import prismaClient from "../../prisma";

interface ConfigBlog {
    name_blog: string;
    email_blog: string;
    logo: string;
    phone?: string;
    description_blog?: string;
}

class CreateConfigurationBlogService {
    async execute({ name_blog, email_blog, logo, phone, description_blog }: ConfigBlog) {

        const config = await prismaClient.configurationBlog.create({
            data: {
                name_blog: name_blog,
                email_blog: email_blog,
                logo: logo,
                phone: phone,
                description_blog: description_blog
            }
        })

        return config;

    }
}

export { CreateConfigurationBlogService }