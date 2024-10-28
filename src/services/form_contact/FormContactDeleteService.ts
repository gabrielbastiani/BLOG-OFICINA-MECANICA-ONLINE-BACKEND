import prismaClient from "../../prisma";

interface FormRequest {
    form_contact_id: string;
}

class FormContactDeleteService {
    async execute({ form_contact_id }: FormRequest) {

        const form = await prismaClient.form_contact.delete({
            where: {
                id: form_contact_id
            }
        });

        return form;

    }
}

export { FormContactDeleteService }