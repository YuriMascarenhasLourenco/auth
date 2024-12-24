import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
@Entity()
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: null })
  salt: string | null;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;
}
