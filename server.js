// const PORT = process.env.PORT || 3000;
// const io = require("socket.io")(PORT);

// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
//const { Server } = require("socket.io");
//const io = new Server(server);

// app.get("/", (req, res) => {
//   res.send("just");
//   console.log("Requesting");
// });

// const users = {};
// io.on("connection", (socket) => {
//   socket.on("new-user", (name) => {
//     users[socket.id] = name;
//     socket.broadcast.emit("user-connected", name);
//   });
//   socket.on("send-chat-message", (message) => {
//     socket.broadcast.emit("chat-message", {
//       message: message,
//       name: users[socket.id],
//     });
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("user-disconnected", users[socket.id]);
//     delete users[socket.id];
//   });
// });

// server.listen(3300, () => {
//   console.log("listening on *:3300");
// });

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: server });
wss.on("connection", function connection(ws) {
  // sending welcome message to joined user
  let welcome = {
    sender: "Server",
    msg: "Welcome to chat!",
  };
  ws.send(JSON.stringify(welcome));
  // sending New user joined message to all of the users
  let newUserJoined = {
    sender: "Server",
    msg: "A new user joined to chat!",
  };
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newUserJoined));
    }
  });
  // handling message
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(3300, () => console.log(`Lisening on port :3300`));
