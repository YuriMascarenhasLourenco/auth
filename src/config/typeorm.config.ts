import { userSubscriber } from 'src/common/interfaces/userSubscriber';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'nest-db',
  entities: [User],
  subscribers: [userSubscriber],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  logging: true,
});
