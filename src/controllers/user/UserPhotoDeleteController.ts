import { Request, Response } from 'express'
import { UserPhotoDeleteService } from '../../services/user/UserPhotoDeleteService'

class UserPhotoDeleteController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const detail_user = new UserPhotoDeleteService();

        const user = await detail_user.execute({ user_id });

        return res.json(user);

    }
}

export { UserPhotoDeleteController }