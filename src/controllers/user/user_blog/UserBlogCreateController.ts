import { Request, Response } from 'express';
import { UserBlogCreateService } from '../../../services/user/user_blog/UserBlogCreateService'; 

class UserBlogCreateController {
    async handle(req: Request, res: Response) {
        const {
            name,
            email,
            password,
            image_user,
            newsletter
        } = req.body;

        const createUser = new UserBlogCreateService();

        let imageToUpdate = image_user;
        if (!image_user && req.file) {
            imageToUpdate = req.file.filename;
        }

        const users = await createUser.execute({
            name,
            email,
            password,
            image_user: imageToUpdate,
            newsletter
        });

        return res.json(users)

    }
}

export { UserBlogCreateController }