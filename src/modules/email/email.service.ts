import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class EmailService {
  constructor(private readonly mailservice: MailerService) {}
  async sendEmail(): Promise<void> {
    try {
      const info = await this.mailservice.sendMail({
        from: '"Yuri" <mascarenhasyuri3@gmail.com>',
        to: 'lourenco99yuri@gmail.com',
        subject: 'Teste SMTP Mailgun',
        text: 'Este é um e-mail de teste enviado via Mailgun SMTP!',
      });

      console.log('E-mail enviado com sucesso:', info.messageId);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }
}
