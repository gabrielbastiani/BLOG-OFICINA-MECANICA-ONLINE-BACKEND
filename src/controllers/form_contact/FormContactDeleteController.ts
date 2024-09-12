import { Request, Response } from 'express';
import { FormContactDeleteService } from '../../services/form_contact/FormContactDeleteService'; 

class FormContactDeleteController {
    async handle(req: Request, res: Response) {
        const form_contact_id = req.query.form_contact_id as string;

        const form_contact = new FormContactDeleteService();

        const form = await form_contact.execute({
            form_contact_id
        });

        return res.json(form)

    }
}

export { FormContactDeleteController }