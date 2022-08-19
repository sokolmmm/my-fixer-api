import nodemailer, { Transporter } from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';

import defaultConfig from '../config/default';

class MailService {
  private transporter: Transporter;

  private transportOptions: SMTPConnection.Options = {
    host: defaultConfig.nodemailer.host,
    port: +defaultConfig.nodemailer.port,
    secure: false,
    auth: {
      user: defaultConfig.nodemailer.auth.user,
      pass: defaultConfig.nodemailer.auth.pass,
    },
  };

  constructor() {
    this.transporter = nodemailer.createTransport(this.transportOptions);
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: defaultConfig.nodemailer.auth.user,
      to,
      subject: 'Please Activate E-mail Address',
      text: '',
      html: `
            <div>
                <p>
                  Hello from MyFixer Company!<br>
                  Please click on the link below to verify your e-mail address:
                <p>
                <a href="${link}">${link}</a>
                <p>
                  If your e-mail program does not recognize the above link as an active link,
                  please copy and paste it into your Web browser.
                </p>
                <p>
                  Kindest regards,<br>
                  MyFixer.com
                </p>
            </div>
        `,
    });
  }

  async sendResetPasswordMail(to: string, code: string) {
    await this.transporter.sendMail({
      from: defaultConfig.nodemailer.auth.user,
      to,
      subject: 'Reset password',
      text: '',
      html: `
            <div>
                <p>
                 Hey there, <br>
                 You are receiving this email because we received a password reset request for your account. <br>
                <p>
                  This is your password reset code:
                <p>
                <h3>${code}</h3>
                  If you did not make this request, please ignore this email.
                </p>
                <p>
                  Thanks,<br>
                  MyFixer.com
                </p>
            </div>
        `,
    });
  }
}

export default new MailService();
