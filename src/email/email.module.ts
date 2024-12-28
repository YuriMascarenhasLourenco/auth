import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org', // Servidor SMTP
        port: 465, // Porta SMTP
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
