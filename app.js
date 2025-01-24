
const socket = new WebSocket('ws://localhost:3000');

const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const messagesDiv = document.getElementById('messages');

let username = '';

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (!username) {
        username = usernameInput.value || 'Guest';
    }
    if (message) {
        socket.send(JSON.stringify({ username, message }));
        messageInput.value = '';
    }
});

socket.onmessage = (event) => {
    const { username, message } = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};
