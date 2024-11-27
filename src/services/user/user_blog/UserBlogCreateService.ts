import { RoleUser } from '@prisma/client';
import prismaClient from '../../../prisma';
import { hash } from 'bcryptjs';
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface UserRequest {
    name: string;
    email: string;
    image_user?: string;
    password: string;
    newsletter?: string;
}

class UserBlogCreateService {
    async execute({ name, email, password, image_user, newsletter }: UserRequest) {

        const newsletterBool =
            newsletter === "true" ? true : newsletter === "false" ? false : undefined;

        if (newsletterBool === undefined) {
            throw new Error("Invalid value for 'newsletter'. Use 'true' or 'false'.");
        }

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await prismaClient.userBlog.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user_create = await prismaClient.userBlog.create({
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                newsletter: newsletterBool
            }
        });

        if (newsletterBool === true) {
            await prismaClient.newsletter.create({
                data: {
                    name_user: name,
                    email_user: email
                }
            });
        }

        const users_superAdmins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id)
        ];

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: "Usuário do blog criado com sucesso",
            type: "user"
        }));

        await prismaClient.notificationUser.createMany({
            data: notificationsData
        });

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });

        const requiredPath = path.join(__dirname, `../../emails_transacionais/criacao_de_usuario_blog.ejs`);

        const data = await ejs.renderFile(requiredPath, {
            name: name
        });

        await transporter.sendMail({
            from: `Blog oficina mecânica online <contato.graxa@oficinamecanicaonline.com>`,
            to: "contato.graxa@oficinamecanicaonline.com",
            subject: `Novo usuario do blog da Oficina mecânica online`,
            html: data
        });

        return user_create;

    }

}

export { UserBlogCreateService }