import { RoleUser } from '@prisma/client';
import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface UserRequest {
    user_id: string;
    name?: string;
    email?: string;
    image_user?: string;
    password?: string;
    role?: string;
    status?: boolean;
}

class UserUpdateDataService {
    async execute({ user_id, name, email, password, image_user, role, status }: UserRequest) {

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

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const update_user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                role: role as RoleUser,
                status: status
            }
        });

        /* const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });

        const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_administrador.ejs`);

        const data = await ejs.renderFile(requiredPath, {
            name: update_user.name
        });

        await transporter.sendMail({
            from: `Blog oficina mecânica online <contato.graxa@oficinamecanicaonline.com>`,
            to: update_user.email,
            subject: `Novo administrador se cadastrando no CMS do blog da Oficina mecânica online`,
            html: data
        }); */

        return update_user;

    }

}

export { UserUpdateDataService }