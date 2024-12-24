import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './editFileName';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: '/uploads',
        filename: editFileName,
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
