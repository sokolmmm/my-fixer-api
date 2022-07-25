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
      subject: 'Account activation: ',
      text: '',
      html:
        `
            <div>
                <h1>For activation </h1>
                <a href="${link}">${link}</a>
            </div>
        `,
    });
  }
}

export default new MailService();
