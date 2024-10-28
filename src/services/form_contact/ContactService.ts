import prismaClient from "../../prisma";

interface ContactProps {
    form_contact_id: string;
}

class ContactService {
    async execute({ form_contact_id }: ContactProps) {

        const contact = await prismaClient.form_contact.findUnique({
            where: {
                id: form_contact_id
            }
        });

        return contact;

    }
}

export { ContactService }