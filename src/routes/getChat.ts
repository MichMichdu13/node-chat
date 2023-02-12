import { Application } from "express-ws";
import * as path from 'path';
import { findUserById } from '../repositories/userRepository';

export function getChat(app: Application) {
  app.get('/chat', async (req, res) => {
    try {
      const user = await findUserById
      if(!user) {
        res.clearCookie('ssid');
        res.redirect('/login');
        return
      }

      res.sendFile(path.join(__dirname, '../../pages/chat.html'))
    } catch(e) {
      res.status(500).send('Internal Server Error')
    }
  })
}