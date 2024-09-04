import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
}

class UserUpdateStatusService {
    async execute({ user_id }: UserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (user.status === true) {
            const update_status = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    status: false
                }
            });

            return update_status;
        }

        if (user.status === false) {
            const update_status = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    status: true
                }
            });

            return update_status;
        }

    }
}

export { UserUpdateStatusService }