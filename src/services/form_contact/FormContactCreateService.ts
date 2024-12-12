import prismaClient from "../../prisma";
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";
import { RoleUser } from "@prisma/client";

interface FormRequest {
    email_user: string;
    name_user: string;
    subject: string;
    menssage: string;
}

class FormContactCreateService {
    async execute({ email_user, name_user, subject, menssage }: FormRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const comment_create = await prismaClient.form_contact.create({
            data: {
                email_user: email_user,
                name_user: name_user,
                slug_name_user: removerAcentos(name_user),
                subject: subject,
                menssage: menssage
            }
        });

        const users_superAdmins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        const users_admins = await prismaClient.user.findMany({
            where: {
                role: RoleUser.ADMIN
            }
        });

        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];

        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: "Formulario de contato enviado",
            type: "contact_form"
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

        const infos_blog = await prismaClient.configurationBlog.findFirst();

        const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_mensagem_formulario.ejs`);

        const data = await ejs.renderFile(requiredPath, {
            name: name_user,
            menssage: menssage,
            subject: subject,
            logo: infos_blog.logo,
            name_blog: infos_blog.name
        });

        await transporter.sendMail({
            from: `${email_user}`,
            to: `${infos_blog.email}`,
            subject: `Alguém enviou uma mensagem para o ${infos_blog.name}`,
            html: data
        });

        return comment_create;

    }
}

export { FormContactCreateService }