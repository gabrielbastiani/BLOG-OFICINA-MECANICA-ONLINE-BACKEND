import { Request, Response } from "express";
import { CreatePopupService } from "../../services/marketing_publication/CreatePopupService"; 

class CreatePopupController {
    async handle(req: Request, res: Response) {
        const {
            title,
            description,
            image_url,
            redirect_url,
            popup_position,
            popup_behavior,
            popup_conditions,
            status,
        } = req.body;

        const service = new CreatePopupService();

        const popup = await service.execute({
            title,
            description,
            image_url,
            redirect_url,
            popup_position,
            popup_behavior,
            popup_conditions: popup_conditions ? JSON.parse(popup_conditions) : null,
            status,
        });

        return res.status(201).json(popup);
    }
}

export { CreatePopupController };