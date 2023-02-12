const messageList = document.getElementById('message-list');
const statusBubble = document.getElementById('connexion-status');

let ws;
connect();

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws');
  ws.onopen = () => {
    console.log('Connected');
    statusBubble.style.backgroundColor = 'green';
  };

  ws.onmessage = (event) => {
    const {data, type} = JSON.parse(event.data);
    console.log(data)
    addMessage(data.userName, data.content);
  };

  ws.onerror = (error) => {
    console.log(error);
  };

  ws.onclose = () => {
    statusBubble.style.backgroundColor = 'red';
    setTimeout(connect, 1000);
  }
}

function addMessage(name, message) {
  const messageElement = document.createElement('div')
  messageList.appendChild(messageElement);
  const nameElement = document.createElement('b')
  nameElement.innerText = name + ':';
  const contentElement = document.createElement('span')
  contentElement.innerText = message;
  messageElement.appendChild(nameElement);
  messageElement.appendChild(contentElement);
}

function addPost(name, content) {
  //TODO
}

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  addMessage('Moi', input.value);
  ws.send(JSON.stringify({type: "reply", content: input.value}));
  input.value = '';
})

