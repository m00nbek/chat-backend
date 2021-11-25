const sendButton = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3300");
// Listen for messages
socket.addEventListener("message", function (event) {
  if ((typeof event.data == Blob) | (typeof event.data == "object")) {
    console.log("Blob type");
    var reader = new FileReader();
    reader.addEventListener("loadend", function () {
      var response = JSON.parse(reader.result);
      appendMessage(`${response.sender}: ${response.msg}`);
    });
    reader.readAsText(event.data);
  } else {
    console.log("not Blob type");
    var data = JSON.parse(event.data);
    appendMessage(`${data.sender}: ${data.msg}`);
  }
});
// get user's name
let name = "";
while(name == "" || name == " ") {
  name = prompt("What is your name?");
};
// Send message
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage();
});
// send message
function sendMessage() {
  // get message from document
  const message = messageInput.value;
  if (message != "" && message != " ") {
    // create json
    let data = {
      sender: name,
      msg: message,
    };
    appendMessage(`${data.sender}: ${data.msg}`);
    socket.send(JSON.stringify(data));

    // ui
    messageInput.value = "";
  }
}
// send message when enter pressed
messageInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    // enter pressed
    sendMessage();
  }
});

// append message to document
function appendMessage(message) {
    const chatWindow = document.getElementById('chat-window')
    const displayMessage = document.getElementById("display-message");
    displayMessage.innerHTML += `<p><strong>${message}</strong></p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
}