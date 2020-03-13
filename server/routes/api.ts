import express from 'express';
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apiRouter = express.Router();

// IMPORT CONTORLLERS
import apiController from '../controllers/apiController';

apiRouter.get('/', apiController.hello, (req, res) => {
  res.status(200).json(res.locals.hello);
});

apiRouter.post(
  '/file',
  upload.single('yaml'),
  apiController.convertFile,
  apiController.formatFileData,
  (req, res) => {
    res.status(200).json(res.locals);
  },
);

export default apiRouter;
