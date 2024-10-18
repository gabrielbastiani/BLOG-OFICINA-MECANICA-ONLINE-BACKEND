import prismaClient from "../../prisma";

interface UserRequest {
    user_id?: string;
}

class AllUsersService {
    async execute({ user_id }: UserRequest) {



        const all_users = await prismaClient.user.findMany();

        const super_admin = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });



        const data = {
            all_users,
            super_admin
        }

        return data;

    }
}

export { AllUsersService }