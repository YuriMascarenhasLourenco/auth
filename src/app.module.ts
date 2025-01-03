import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { userSubscriber } from './common/interfaces/userSubscriber';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { UploadModule } from './modules/upload/upload.module';
import { EmailModule } from './modules/email/email.module';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nest-db',
      entities: [User],
      synchronize: false,
      subscribers: [userSubscriber],
      autoLoadEntities: true,
      logging: true,
      logger: 'file',
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      migrationsRun: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 5,
      max: 100,
    }),
    AuthModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level}]: ${message}`;
            }),
          ),
        }),
        ,
        new winston.transports.Http({
          host: 'localhost',
          port: 3000,
          path: '/logs',
          format: winston.format.json(),
        }),
      ],
    }),
    UploadModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
