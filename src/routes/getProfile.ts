import { Application } from 'express';
import * as path from 'path';


export function getProfile(app: Application){
  app.get('/profile', (req, res) => {
    if (!req.signedCookies.ssid){
      res.redirect('/');
      return
    }
    res.sendFile(path.join(__dirname, '../../pages/profile.html'))
  })
}