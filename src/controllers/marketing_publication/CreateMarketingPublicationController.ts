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
            status,
            is_popup
        } = req.body;

        const configurationMarketingPublication = req.body.configurationMarketingPublication ? JSON.parse(req.body.configurationMarketingPublication) : [];

        let imageToUpdate = req.body.image_url;
        if (!req.body.image_url && req.file) {
            imageToUpdate = req.file.filename;
        }

        const createBannerService = new CreateMarketingPublicationService();

        const marketing = await createBannerService.execute({
            title,
            description,
            image_url: imageToUpdate,
            redirect_url,
            publish_at_start: publish_at_start ? new Date(publish_at_start) : undefined,
            publish_at_end: publish_at_end ? new Date(publish_at_end) : undefined,
            configurationMarketingPublication,
            status: status || "Indisponivel",
            is_popup: is_popup === "true"
        });

        return res.status(201).json(marketing);
    }
}

export { CreateMarketingPublicationController };