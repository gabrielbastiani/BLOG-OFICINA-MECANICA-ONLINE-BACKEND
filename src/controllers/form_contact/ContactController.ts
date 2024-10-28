import { Request, Response } from 'express'
import { ContactService } from '../../services/form_contact/ContactService'; 

class ContactController {
    async handle(req: Request, res: Response) {

        const form_contact_id = req.query.form_contact_id as string;

        const detail_contact = new ContactService();

        const contact = await detail_contact.execute({ form_contact_id });

        return res.json(contact);

    }
}

export { ContactController }