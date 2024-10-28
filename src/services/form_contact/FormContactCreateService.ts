import prismaClient from "../../prisma";

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

        return comment_create;

    }
}

export { FormContactCreateService }