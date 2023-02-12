import { Application } from 'express';
import bodyParser from 'body-parser';
import { createUser, findUserByEmail } from '../repositories/userRepository';


export function PostRegister(app: Application) {  
  app.post('/register', 
    bodyParser.urlencoded(), 
    async (req,res) => {
      try {
        const {email, name} = req.body;
        if (!email || !name) {
          res.status(400).send('Bad Request');
          return;
        }
        const existingUser = await findUserByEmail(email);
        console.log(existingUser)
        if (existingUser) {
          res.status(409).send('Email is already taken');
          return;
        }

        const user = await createUser(email, name);

        res.cookie(
          'ssid', 
          user.id, 
          {signed: true, httpOnly: true, sameSite: true}
        );
        
        res.redirect('/')
      } catch(e) {
        res.status(500).send('Internal Server Error')
      }
    }
  );
}