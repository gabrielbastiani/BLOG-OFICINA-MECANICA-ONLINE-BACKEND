import { Request, Response } from "express";
import { UserAuthService } from "../../services/user/UserAuthService";

class UserAuthController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authUserService = new UserAuthService();

        const auth = await authUserService.execute({
            email,
            password
        })

        return res.json(auth);
    }
}

export { UserAuthController }