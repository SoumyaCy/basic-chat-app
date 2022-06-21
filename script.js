const socket = io("http://localhost:3000");
const chatContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const appendMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  chatContainer.append(messageElement);
};

const user = prompt("Please enter your name");
appendMessage("You joined");
socket.emit("new-user", user);

socket.on("user-connected", (newUser) => {
  appendMessage(`${newUser} has joined`);
});
socket.on("user-disconnected", (newUser) => {
  appendMessage(`${newUser} has left the chat`);
});
socket.on("chat-message", (data) => {
  const { name, message } = data;
  appendMessage(`${name}:${message}`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You:${message}`);
  // console.log(message);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});
