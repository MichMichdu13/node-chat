import { Application } from 'express-ws';
import bodyParser from 'body-parser';


export function postLogout(app: Application) {  
  app.post('/logout', bodyParser.urlencoded(), (req,res) => {
    res.clearCookie('ssid');
    res.redirect('/login');
  });
}