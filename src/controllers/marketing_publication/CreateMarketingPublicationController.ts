import { Request, Response } from "express";
import { CreateMarketingPublicationService } from "../../services/marketing_publication/CreateMarketingPublicationService";

class CreateMarketingPublicationController {
    async handle(req: Request, res: Response) {
        const { title, description, redirect_url, publish_at, status } = req.body;

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
            publish_at: publish_at ? new Date(publish_at) : undefined,
            status: status || "Indisponivel"
        });

        return res.status(201).json(marketing);
    }
}

export { CreateMarketingPublicationController };