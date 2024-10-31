import prismaClient from "../../prisma";
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

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

        await prismaClient.notificationUser.create({
            data: {
                message: "Formulario de contato enviado"
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

        const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_mensagem_formulario.ejs`);

        const data = await ejs.renderFile(requiredPath, {
            name: name_user,
            menssage: menssage,
            subject: subject
        });

        await transporter.sendMail({
            from: `${email_user}`,
            to: "contato.graxa@oficinamecanicaonline.com",
            subject: `Alguém enviou uma mensagem para o Blog Oficina mecânica online`,
            html: data
        });

        return comment_create;

    }
}

export { FormContactCreateService }