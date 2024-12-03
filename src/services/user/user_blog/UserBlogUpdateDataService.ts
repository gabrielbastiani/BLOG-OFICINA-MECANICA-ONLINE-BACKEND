import { StatusUser } from '@prisma/client';
import prismaClient from '../../../prisma';
import fs from 'fs';
import path from 'path';
import { hash } from 'bcryptjs';

interface UserRequest {
    user_id: string;
    name?: string;
    email?: string;
    image_user?: string;
    status?: string;
    password?: string;
}

class UserBlogUpdateDataService {
    async execute({ user_id, name, email, image_user, status, password }: UserRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const userBlog = await prismaClient.userBlog.findUnique({
            where: { id: user_id }
        });

        if (!userBlog) {
            throw new Error("User not found");
        }

        const dataToUpdate: any = {};

        if (name) {
            dataToUpdate.name = name;
            dataToUpdate.slug_name = removerAcentos(name);
        }

        if (email) {
            const userAlreadyExists = await prismaClient.userBlog.findFirst({
                where: {
                    email: email,
                    id: { not: user_id }
                }
            });

            if (userAlreadyExists) {
                throw new Error("User already exists");
            }

            dataToUpdate.email = email;
        }

        if (image_user) {
            if (userBlog.image_user) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + userBlog.image_user);
                console.log(`Deleting image: ${imagePath}`);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_user = image_user;
        }

        if (status) {
            dataToUpdate.status = status as StatusUser;
        }

        if (password) {
            const hashedPassword = await hash(password, 8);
            dataToUpdate.password = hashedPassword;
        }

        const update_user = await prismaClient.userBlog.update({
            where: {
                id: user_id
            },
            data: dataToUpdate
        });

        return update_user;
    }
}

export { UserBlogUpdateDataService };