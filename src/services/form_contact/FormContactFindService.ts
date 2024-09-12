import prismaClient from "../../prisma";

interface FormRequest {
    form_contact_id?: string;
}

class FormContactFindService {
    async execute({ form_contact_id }: FormRequest) {

        if (form_contact_id) {
            const forms_all = await prismaClient.form_contact.findMany({
                where: {
                    id: form_contact_id
                }
            });

            return forms_all;
        }

    }
}

export { FormContactFindService }