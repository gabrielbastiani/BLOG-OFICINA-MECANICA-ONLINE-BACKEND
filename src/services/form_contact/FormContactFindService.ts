import prismaClient from "../../prisma";

interface FormRequest {
    form_contact_id?: string;
}

class FormContactFindService {
    async execute({ form_contact_id }: FormRequest) {

        if (form_contact_id) {
            const form = await prismaClient.form_contact.findMany({
                where: {
                    id: form_contact_id
                }
            });

            return form;
        }

        const form_all = await prismaClient.form_contact.findMany();

        return form_all;

    }
}

export { FormContactFindService }