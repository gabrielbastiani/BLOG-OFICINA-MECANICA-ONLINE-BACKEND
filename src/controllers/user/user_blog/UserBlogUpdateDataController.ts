import { Request, Response } from 'express';
import { UserBlogUpdateDataService } from '../../../services/user/user_blog/UserBlogUpdateDataService'; 

class UserBlogUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            user_id,
            name,
            email,
            status,
            password
        } = req.body;

        const createUser = new UserBlogUpdateDataService();

        let imageToUpdate = req.body.image_user;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const users = await createUser.execute({
            user_id,
            name,
            email,
            image_user: imageToUpdate,
            status,
            password
        });

        return res.json(users);
    }
}

export { UserBlogUpdateDataController };