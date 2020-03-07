import { Response, Request, NextFunction } from "express";

interface Hello {
  message: string;
}

const apiController = {

  hello: (req: Request, res: Response, next: NextFunction) => {
    const hello: Hello = {
      message: 'Hello nautilis api!',
    }
    res.locals.hello = hello;
    return next();
  }

};



export default apiController;