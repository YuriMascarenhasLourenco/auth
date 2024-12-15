import { Column } from 'typeorm';
import { commonEntityInterface } from './common-entity.interface';

export abstract class commonEntity implements commonEntityInterface {
  @Column()
  id: string;
  @Column()
  password: string;
  @Column()
  email: string;
}
