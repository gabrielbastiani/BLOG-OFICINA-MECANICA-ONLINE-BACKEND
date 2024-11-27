import { Request, Response } from "express";
import { UserBlogAuthService } from "../../../services/user/user_blog/UserBlogAuthService"; 

class UserBlogAuthController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authUserService = new UserBlogAuthService();

        const auth = await authUserService.execute({
            email,
            password
        })

        return res.json(auth);
    }
}

export { UserBlogAuthController }