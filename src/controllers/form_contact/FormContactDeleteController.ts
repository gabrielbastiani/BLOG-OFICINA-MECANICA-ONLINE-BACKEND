import { Request, Response } from 'express';
import { FormContactDeleteService } from '../../services/form_contact/FormContactDeleteService';

class FormContactDeleteController {
    async handle(req: Request, res: Response) {
        const { id_delete } = req.body;

        const formContactDeleteService = new FormContactDeleteService();

        const deletedForms = await formContactDeleteService.execute({
            id_delete
        });

        return res.json(deletedForms);
    }
}

export { FormContactDeleteController };