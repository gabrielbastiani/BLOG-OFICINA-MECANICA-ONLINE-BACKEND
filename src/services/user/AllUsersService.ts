import prismaClient from "../../prisma";

interface UserRequest {
    user_id?: string;
}

class AllUsersService {
    async execute({ user_id }: UserRequest) {



        const all_users = await prismaClient.user.findMany();



        const data = {
            all_users,
        }

        return data;

    }
}

export { AllUsersService }