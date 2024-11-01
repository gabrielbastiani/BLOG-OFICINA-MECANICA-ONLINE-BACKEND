import { Request, Response } from 'express'
import { UserDeleteService } from '../../services/user/UserDeleteService'

class UserDeleteController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;
        const name = req.query.name as string;

        const detail_user = new UserDeleteService();

        const user = await detail_user.execute({ user_id, name });

        return res.json(user);

    }
}

export { UserDeleteController }