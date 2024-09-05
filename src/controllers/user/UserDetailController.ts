import { Request, Response } from 'express'
import { UserDetailService } from '../../services/user/UserDetailService'

class UserDetailController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const detail_user = new UserDetailService();

        const user = await detail_user.execute({ user_id });

        return res.json(user);

    }
}

export { UserDetailController }