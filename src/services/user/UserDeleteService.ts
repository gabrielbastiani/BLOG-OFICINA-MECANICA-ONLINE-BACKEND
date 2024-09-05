import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface UserRequest {
    user_id: string;
}

class UserDeleteService {
    async execute({ user_id }: UserRequest) {

        const user_photo = await prismaClient.user.findUnique({
            where: {
                id: user_id
            }
        });

        const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + user_photo.image_user);
        console.log(`Deleting image: ${imagePath}`);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            } else {
                console.log('Old image deleted successfully');
            }
        });

        const user = await prismaClient.user.delete({
            where: {
                id: user_id
            }
        });

        return user;

    }
}

export { UserDeleteService }