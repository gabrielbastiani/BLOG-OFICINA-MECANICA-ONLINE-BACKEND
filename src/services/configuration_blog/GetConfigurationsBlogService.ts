import prismaClient from "../../prisma";

class GetConfigurationsBlogService {
    async execute() {

        const config = await prismaClient.configurationBlog.findFirst();

        return config;

    }
}

export { GetConfigurationsBlogService }