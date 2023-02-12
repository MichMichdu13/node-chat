import { Application } from 'express-ws';
import bodyParser from 'body-parser';
import { updateUser } from '../repositories/userRepository';


export function patchProfile(app: Application) {  
  app.post('/profile', bodyParser.urlencoded(), async (req,res) => {
    try {
      const ssid = req.signedCookies.ssid;
      
      await updateUser(ssid, req.body);

      res.redirect('/');
    } catch(e) {
      res.status(500).send('Internal Server Error')
    }
  });
}