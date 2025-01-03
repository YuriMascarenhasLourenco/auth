import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true); // Aceita o arquivo
        } else {
          cb(new Error('Tipo de arquivo não permitido'), false); // Rejeita o arquivo
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5 MB por arquivo
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
