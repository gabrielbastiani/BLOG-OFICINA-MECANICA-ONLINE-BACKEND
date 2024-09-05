import { Request, Response } from "express";
import { PasswordRecoveryUserSevice } from "../../services/user/PasswordRecoveryUserSevice"; 

class PasswordRecoveryUserController {
  async handle(req: Request, res: Response) {
    const passwordRecoveryUser_id = req.query.passwordRecoveryUser_id as string;

    const { password } = req.body;

    const passwordRecovery = new PasswordRecoveryUserSevice();

    const recoveryPassword = await passwordRecovery.execute({
      passwordRecoveryUser_id,
      password,
    });

    return res.json(recoveryPassword)
  }

}

export { PasswordRecoveryUserController };