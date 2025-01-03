import { emailOptionsInterface } from './email-options.interface';

export interface SendEmailServiceInterface {
  send(emailOptions: emailOptionsInterface): Promise<any>;
}
