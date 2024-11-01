import { RoleUser, StatusUser } from '@prisma/client';
import prismaClient from '../../prisma';
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
    role?: string;
    send_email?: boolean;
}

class UserCreateService {
    async execute({ name, email, password, image_user, role, send_email }: UserRequest) {

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

        const first_super_user = await prismaClient.user.findFirst({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        if (first_super_user) {
            const user_create = await prismaClient.user.create({
                data: {
                    name: name,
                    slug_name: removerAcentos(name),
                    email: email,
                    image_user: image_user,
                    password: passwordHash,
                    role: role as RoleUser,
                    status: StatusUser.Disponivel
                }
            });

            const transporter = nodemailer.createTransport({
                host: process.env.HOST_SMTP,
                port: 465,
                auth: {
                    user: process.env.USER_SMTP,
                    pass: process.env.PASS_SMTP
                }
            });

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
                message: "Usuário criado com sucesso",
                type: "user"
            }));
    
            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_employee.ejs`);

            const data = await ejs.renderFile(requiredPath, {
                name: user_create.name
            });

            await transporter.sendMail({
                from: `Blog oficina mecânica online <contato.graxa@oficinamecanicaonline.com>`,
                to: "contato.graxa@oficinamecanicaonline.com",
                subject: `Novo usuario se cadastrando no CMS do blog da Oficina mecânica online`,
                html: data
            });

            if (send_email === true) {

                const requiredPath = path.join(__dirname, `../emails_transacionais/data_login_user.ejs`);

                const data = await ejs.renderFile(requiredPath, {
                    name: user_create.name,
                    email: user_create.email,
                    password: password
                });

                await transporter.sendMail({
                    from: `Blog oficina mecânica online <contato.graxa@oficinamecanicaonline.com>`,
                    to: user_create.email,
                    subject: `Dados de acesso CMS do blog da Oficina mecânica online`,
                    html: data
                });

            }

            return user_create;

        }

        const user_create_super_admin = await prismaClient.user.create({
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                role: RoleUser.SUPER_ADMIN
            }
        });

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });

        const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_super_administrador.ejs`);

        const data = await ejs.renderFile(requiredPath, {
            name: user_create_super_admin.name
        });

        await transporter.sendMail({
            from: `Blog oficina mecânica online <contato.graxa@oficinamecanicaonline.com>`,
            to: user_create_super_admin.email,
            subject: `Novo super administrador se cadastrando no CMS do blog da Oficina mecânica online`,
            html: data
        });

        return user_create_super_admin;

    }

}

export { UserCreateService }