import { Request, Response } from 'express';
import { UserUpdateDataService } from '../../services/user/UserUpdateDataService';

class UserUpdateDataController {
    async handle(req: Request, res: Response) {

        const {
            user_id,
            name,
            email,
            role,
            status,
            password
        } = req.body;

        const createUser = new UserUpdateDataService();

        let imageToUpdate = req.body.image_user;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const users = await createUser.execute({
            user_id,
            name,
            email,
            image_user: imageToUpdate,
            role,
            status,
            password
        });

        return res.json(users);
    }
}

export { UserUpdateDataController };