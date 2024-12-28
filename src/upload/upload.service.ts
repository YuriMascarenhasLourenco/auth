import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    return { message: 'File uploaded successfully', filePath: file.path };
  }
}
