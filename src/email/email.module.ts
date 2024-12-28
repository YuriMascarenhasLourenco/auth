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
          user: 'postmaster@sandbox776586aee39b45e0bc366895591bb3c2.mailgun.org',
          pass: 'ebe4a98fe5dc3934dc6772493316669c-2e68d0fb-b9e99a35',
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
