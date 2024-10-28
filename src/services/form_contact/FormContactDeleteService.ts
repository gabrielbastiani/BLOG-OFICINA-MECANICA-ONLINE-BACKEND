import prismaClient from "../../prisma";

interface FormRequest {
    form_contact_ids: string[];
}

class FormContactDeleteService {
    async execute({ form_contact_ids }: FormRequest) {
        const deletedForms = await prismaClient.form_contact.deleteMany({
            where: {
                id: {
                    in: form_contact_ids
                }
            }
        });

        return deletedForms;
    }
}

export { FormContactDeleteService };