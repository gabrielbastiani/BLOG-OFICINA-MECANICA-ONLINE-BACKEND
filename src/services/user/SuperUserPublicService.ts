import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";

class SuperUserPublicService {
    async execute() {

        const user = await prismaClient.user.findMany({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        return user;

    }
}

export { SuperUserPublicService }