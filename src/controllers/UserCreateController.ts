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

        if (!image_user) {
            const { originalname, filename: image_user } = req.file;
            const users = await createUser.execute({
                name,
                email,
                image_user,
                password
            });

            return res.json(users)
        }

        const users = await createUser.execute({
            name,
            email,
            password
        });

        return res.json(users)

    }
}

export { UserCreateController }