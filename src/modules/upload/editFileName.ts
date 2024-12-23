import { extname } from 'path';

export const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: any,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => {
      Math.round(Math.random() * 16).toString();
    })
    .join('');
  callback(null, `${name}-${randomName}-${fileExtName}`);
};
export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
    return callback(new Error('only images allowed'), false);
  }
  callback(null, true);
};
