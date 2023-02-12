import { Application } from "express-ws";
import * as path from 'path';
import { findAllPosts } from "../repositories/postRepository";
import { findUserById } from '../repositories/userRepository';

export function getRoot(app: Application) {
  app.get('/', async (req, res) => {
    try {
      const user = await findUserById
      if(!user) {
        res.clearCookie('ssid');
        res.redirect('/login');
        return
      }

      const posts = (await findAllPosts()).map((item) => {
        const formatedDate = item.createdAt.toUTCString();
        return {...item, formatedDate}
      })
      
      res.render(path.join(__dirname, '../../pages/index'), { posts })
    } catch(e) {
      res.status(500).send('Internal Server Error')
    }
  })
}