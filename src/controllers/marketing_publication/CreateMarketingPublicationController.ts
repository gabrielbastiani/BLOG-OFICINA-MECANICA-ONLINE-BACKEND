import { Request, Response } from "express";
import { CreateMarketingPublicationService } from "../../services/marketing_publication/CreateMarketingPublicationService";

class CreateMarketingPublicationController {
    async handle(req: Request, res: Response) {
        const {
            title,
            description,
            redirect_url,
            publish_at_start,
            publish_at_end,
            local_site,
            status,
            popup_position,
            popup_behavior,
            popup_conditions,
            is_popup
        } = req.body;

        let imageToUpdate = req.body.image_url;
        if (!req.body.image_url && req.file) {
            imageToUpdate = req.file.filename;
        }

        const createBannerService = new CreateMarketingPublicationService();

        const parsedPopupConditions = popup_conditions ? JSON.parse(popup_conditions) : [];

        const marketing = await createBannerService.execute({
            title,
            description,
            image_url: imageToUpdate,
            redirect_url,
            publish_at_start: publish_at_start ? new Date(publish_at_start) : undefined,
            publish_at_end: publish_at_end ? new Date(publish_at_end) : undefined,
            local_site,
            status: status || "Indisponivel",
            popup_position,
            popup_behavior,
            popup_conditions: parsedPopupConditions,
            is_popup: is_popup === "true"
        });

        return res.status(201).json(marketing);
    }
}

export { CreateMarketingPublicationController };