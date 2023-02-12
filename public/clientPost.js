const postList = document.getElementById('post-list');
const statusBubble = document.getElementById('connexion-status');

let ws;
connect();

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws_post');
  ws.onopen = () => {
    console.log('Connected_to_ws_post');
    statusBubble.style.backgroundColor = 'green';
  };

  ws.onmessage = (event) => {
    const {type, data} = JSON.parse(event.data);
    addPost(data.userName, data.content);
  };

  ws.onerror = (error) => {
    console.log(error);
  };

  ws.onclose = () => {
    statusBubble.style.backgroundColor = 'red';
    setTimeout(connect, 1000);
  }
}

function addPost(name, message) {
  const messageElement = document.createElement('div'); 
  messageElement.classList.add('post');
  postList.appendChild(messageElement);
  
  const headElement = document.createElement('div');
  headElement.classList.add('post-head');
  messageElement.appendChild(headElement);

  const nameElement = document.createElement('b');
  const dateElement = document.createElement('span');
  nameElement.innerText = name;
  dateElement.innerText = new Date().toUTCString();

  headElement.appendChild(nameElement);
  headElement.appendChild(dateElement);

  const contentElement = document.createElement('p')
  contentElement.innerText = message;
  messageElement.appendChild(contentElement);

}