import path from 'path';
import express from 'express';

const app = express();

const env = process.env.NODE_ENV;
const PORT = 3000;

/**
 * IMPORT ROUTERS HERE
 */
import apiRouter from './routes/api';

/**
 * PARSE BODY
 */
app.use(express.json());

/**
 * SERVE STATIC FILES
 */
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

/**
 * ROUTERS
 */
app.use('/api', apiRouter);


// if (env === 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  });
// }

/**
 * BAD ROUTE HANDLER
 */
app.use((req, res) => {
  res.sendStatus(404);
})

/**
 * ERROR HANDLER
 */
app.use((err: any, req: any, res: any, next: any) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware errors.',
    status: 400,
    message: { err: 'check server log for details' }
  }
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`${env} server is listening on port: ${PORT}`))