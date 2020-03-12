import { Response, Request, NextFunction } from 'express';
import yaml from 'js-yaml';
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

interface Service {
  volumes?: string[];
}

interface DependsOn {
  readonly name: string;
  readonly children?: Array<DependsOn>;
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
    res.locals = yamlJSON;
    return next();
  },
  formatFile: (req: Request, res: Response, next: NextFunction) => {
    try {
      const services = res.locals.services;
      const bindMounts: string[] = [];

      // iterate through each service
      Object.keys(services).forEach((name): void => {
        // IF SERVICE HAS VOLUMES PROPERTY
        if (services[name].volumes) {
          // iterate from all the volumes
          services[name].volumes = services[name].volumes.forEach(
            (volume: string): void => {
              // if its a bind mount, capture it
              const v = volume.split(':')[0];
              if (!res.locals.volumes.hasOwnProperty(v)) {
                bindMounts.push(v);
              }
            },
          );
        }
        // IF SERVICE HAS DEPENDS ON PROPERTY
      });
      // add bindMounts property to res.locals
      res.locals.bindMounts = bindMounts;
      return next();
    } catch (e) {
      return next({
        log: `Error in formatFile: ${e}`,
      });
    }
  },
};

export default apiController;
