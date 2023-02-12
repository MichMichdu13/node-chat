import express, { Request, Response } from 'express';
import expressWS, { Application } from 'express-ws';
import * as path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { getLogin } from './routes/getLogin';
import { getRoot } from './routes/getRoot';
import { getWs } from './routes/getWs';
import { postLogin } from './routes/postLogin';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware';
import { getRegister } from './routes/getRegister';
import { PostRegister } from './routes/postRegister';
import { getProfile } from './routes/getProfile';
import { patchProfile } from './routes/patchProfile';
import { deleteProfile } from './routes/deleteProfile';
import { postLogout } from './routes/postLogout';
import { getChat } from './routes/getChat';

const SECRET_KEY = 'MySecretKeyIsAwesome';

function main(){
  const app = express() as unknown as Application;
  expressWS(app);
  const sockets = new Map();

  app.set('view engine', 'ejs');

  app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.path);
    next();
  })

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../assets')));
  app.use(bodyParser.urlencoded())
  app.use(cookieParser(SECRET_KEY, {}))

  /*  Pour l'exemple
  app.use((req, res, next) => {
    next(new Error('Not found'));
  })
  */


  getLogin(app);
  postLogin(app);
  getRegister(app)
  PostRegister(app)

  app.use(authenticationMiddleware)
  getRoot(app);
  getChat(app)
  getProfile(app);
  patchProfile(app);
  deleteProfile(app);
  postLogout(app);
  getWs(app, sockets);


  //error handling
  app.use((error: Error, req: Request, res: Response) => {
    console.error(error);
    res.status(500).send('Internal server error');
  })

  app.listen(3000, () => {
    console.log('Server is runnning on port 3000')
  });
}

main();