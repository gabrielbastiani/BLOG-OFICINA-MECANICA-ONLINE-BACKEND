import { Request, Response } from 'express'
import { UserUpdateStatusService } from '../../services/user/UserUpdateStatusService'

class UserUpdateStatusController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const detail_user = new UserUpdateStatusService();

        const user = await detail_user.execute({ user_id });

        return res.json(user);

    }
}

export { UserUpdateStatusController }