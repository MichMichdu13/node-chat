import { Application } from 'express';
import * as path from 'path';

export function getRegister(app: Application){
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../pages/register.html'))
  })
}