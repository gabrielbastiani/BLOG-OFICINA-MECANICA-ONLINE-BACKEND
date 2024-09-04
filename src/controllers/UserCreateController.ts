import { Request, Response } from 'express';
import { UserCreateService } from '../services/user/UserCreateService';

class UserCreateController {
    async handle(req: Request, res: Response) {
        const {
            name,
            email,
            password,
            image_user
        } = req.body;

        const createUser = new UserCreateService();

        let imageToUpdate = image_user;
        if (!image_user && req.file) {
            imageToUpdate = req.file.filename;
        }

        const users = await createUser.execute({
            name,
            email,
            password,
            image_user: imageToUpdate,
        });

        return res.json(users)

    }
}

export { UserCreateController }