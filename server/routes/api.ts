import express from 'express';

const apiRouter = express.Router();

// IMPORT CONTORLLERS
import apiController from '../controllers/apiController';

apiRouter.get('/', 
  apiController.hello,
  (req, res) => {
    res.status(200).json(res.locals.hello);
  }
);


export default apiRouter;