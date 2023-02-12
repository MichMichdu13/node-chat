import { Application } from 'express-ws';
import bodyParser from 'body-parser';
import { deleteUser } from '../repositories/userRepository';
import * as path from 'path';


export function deleteProfile(app: Application) {  
  app.post('/deleteProfile', bodyParser.urlencoded(), async (req,res) => {
    try {
      const ssid = req.signedCookies.ssid;
      if (!ssid) {
        res.status(400).send('Bad Request')
      }
      await deleteUser(ssid)
      res.clearCookie('ssid');

      res.sendFile(path.join(__dirname, '../../pages/register.html'))
    } catch(e) {
      res.status(500).send('Internal Server Error')
    }
  });
}