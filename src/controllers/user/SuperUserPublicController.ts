import { Request, Response } from "express";
import { SuperUserPublicService } from "../../services/user/SuperUserPublicService";

class SuperUserPublicController {
    async handle(req: Request, res: Response) {

        const user_super = new SuperUserPublicService();

        const user = await user_super.execute()

        return res.json(user);
    }
}

export { SuperUserPublicController }