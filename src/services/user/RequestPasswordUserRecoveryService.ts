import prismaClient from "../../prisma";
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface RecoveryRequest {
  email: string;
}

class RequestPasswordUserRecoveryService {
  async execute({ email }: RecoveryRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw {
        error: { field: "email", message: "Conta não encontrada." },
        code: 400,
      };
    }

    const recovery = await prismaClient.passwordRecoveryUser.create({
      data: {
        email,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.HOST_SMTP,
      port: 465,
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP
      }
    });

    const infos_blog = await prismaClient.configurationBlog.findFirst();

    const requiredPath = path.join(__dirname, `../emails_transacionais/recuperar_senha.ejs`);

    const data = await ejs.renderFile(requiredPath, {
      name: user.name,
      id: recovery.id,
      logo: infos_blog.logo,
      name_blog: infos_blog.name_blog
    });

    await transporter.sendMail({
      from: `"${infos_blog.name_blog} " <${infos_blog.email_blog}>`,
      to: user.email,
      subject: "Recuperação de senha",
      html: data
    });

    return {
      message: "Verifique seu E-mail",
    };
  }
}

export { RequestPasswordUserRecoveryService };