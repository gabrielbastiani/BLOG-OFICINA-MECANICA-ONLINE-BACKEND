import { Request, Response } from 'express';
import { FormContactFindService } from '../../services/form_contact/FormContactFindService'; 

class FormContactFindController {
    async handle(req: Request, res: Response) {
        const form_contact_id = req.query.form_contact_id as string;

        const form_contact = new FormContactFindService();

        const form = await form_contact.execute({
            form_contact_id
        });

        return res.json(form)

    }
}

export { FormContactFindController }