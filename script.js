// const socket = io("http://127.0.0.1:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

// const name = prompt("What is your name?");
// appendMessage("You joined");
// socket.emit("new-user", name);

// socket.on("chat-message", (data) => {
//   appendMessage(`${data.name}: ${data.message}`);
// });
// socket.on("user-connected", (name) => {
//   appendMessage(`${name} connected`);
// });
// socket.on("user-disconnected", (name) => {
//   appendMessage(`${name} disconnected`);
// });

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3300");

// connect
// const name = prompt("What is your name?");
// appendMessage("You joined");
// socket.send("new-user", name);

// // message
// socket.addEventListener("chat-message", function (event) {
//   appendMessage(`${event.name}: ${event.message}`);
// });




// Listen for messages
socket.addEventListener("message", function (event) {
  var reader = new FileReader();
  reader.addEventListener("loadend", function () {
    var response = JSON.parse(reader.result);
    appendMessage(`${response.sender}: ${response.msg}`);
  });
  reader.readAsText(event.data);
});

// get user's name
const name = prompt("What is your name?");
// Send message
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get message from document
    const message = messageInput.value;
    // create json 
    let data = {
        sender: name,
        msg: message
    }
    appendMessage(`${data.sender}: ${data.msg}`);
    socket.send(JSON.stringify(data));

    // ui
    messageInput.value = "";
  });
// append message to document
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
