import { Request, Response } from 'express';
import { AllUsersService } from '../../services/user/AllUsersService';

class AllUserController {
    async handle(req: Request, res: Response) {
        const { page = 1, limit = 5 } = req.query;

        const allUsersService = new AllUsersService();
        const users = await allUsersService.execute(Number(page), Number(limit));

        return res.json(users);
    }
}

export { AllUserController };