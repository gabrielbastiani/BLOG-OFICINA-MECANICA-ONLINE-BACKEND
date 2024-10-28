import { Request, Response } from 'express';
import { FormContactDeleteService } from '../../services/form_contact/FormContactDeleteService';

class FormContactDeleteController {
    async handle(req: Request, res: Response) {
        const { form_contact_ids } = req.body;

        const formContactDeleteService = new FormContactDeleteService();

        const deletedForms = await formContactDeleteService.execute({
            form_contact_ids
        });

        return res.json(deletedForms);
    }
}

export { FormContactDeleteController };