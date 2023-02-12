import { Application } from 'express-ws';
import { WebSocket } from 'ws';
import { findUserById } from '../repositories/userRepository';
import { createPost } from '../repositories/postRepository';


export function getWs(app: Application, sockets: Map<string, WebSocket>) {
  app.ws('/ws', async (ws, req) => {
    try {
      const ssid = req.signedCookies.ssid;
      const user = await findUserById(ssid)
      sockets.set(ssid, ws);

      if (!user){
        ws.close();
        return
      }

      ws.on('message', (msg) => {
        const data = JSON.parse(msg.toString());
        const content = data.content;
        
        sockets.forEach((socket) => {
          if (ws !== socket) {
            socket.send(JSON.stringify({
              type: 'post', 
              data: {userName: user.name, content}
            }));
          }
        })
      });

      ws.on('close', () => {
        sockets.delete(ssid);
      })
    } catch(e) {
      ws.close();
      return
    }
  });

  app.ws('/ws_post', async (ws, req) => {
    try {
      const ssid = req.signedCookies.ssid;
      const user = await findUserById(ssid)
      sockets.set(ssid, ws);

      if (!user){
        ws.close();
        return
      }

      ws.on('message', async (msg) => {
        const data = JSON.parse(msg.toString());
        const content = data.content;

        await createPost(ssid, content);
        
        sockets.forEach((socket) => {
          if (ws !== socket) {
            socket.send(JSON.stringify({
              type: 'post', 
              data: {userName: user.name, content}
            }));
          }
        })
        
      });

      ws.on('close', () => {
        sockets.delete(ssid);
      })
    } catch(e) {
      ws.close();
      return
    }
  });
}