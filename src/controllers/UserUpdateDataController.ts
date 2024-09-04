import { Request, Response } from 'express';
import { UserUpdateDataService } from '../services/user/UserUpdateDataService';

class UserUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            user_id,
            name,
            email,
            image_user,
            password,
            role,
            status
        } = req.body;

        const createUser = new UserUpdateDataService();

        if (!image_user) {
            const { originalname, filename: image_user } = req.file;
            const users = await createUser.execute({
                user_id,
                name,
                email,
                image_user,
                password,
                role,
                status
            });

            return res.json(users)
        }

        const users = await createUser.execute({
            user_id,
            name,
            email,
            password,
            role,
            status
        });

        return res.json(users)

    }
}

export { UserUpdateDataController }