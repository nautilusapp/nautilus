import { Response, Request, NextFunction } from 'express';
const yaml = require('js-yaml');
interface Hello {
  message: string;
}

interface MulterFile {
  key: string;
  path: string;
  mimetype: string;
  originalname: string;
  size: number;
  buffer: Buffer;
}

const apiController = {
  hello: (req: Request, res: Response, next: NextFunction) => {
    const hello: Hello = {
      message: 'Hello nautilus api!',
    };
    res.locals.hello = hello;
    return next();
  },
  convertFile: (
    req: Request & { file: MulterFile },
    res: Response,
    next: NextFunction,
  ) => {
    const yamlJSON = yaml.safeLoad(req.file.buffer.toString());
    return next();
  },
};

export default apiController;
