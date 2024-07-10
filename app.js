// const express = require("express");
// const app = express();
// const path = require("path");
// const PORT = process.env.PORT || 4000;

// const server = app.listen(PORT, () => {
//   console.log(`server on port ${PORT}`);
// });

// const io = require("socket.io")(server);

// // app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, "public")));

// // app.get("/", (req, res) => {
// //   res.render("index");
// // });

// // making a set which contains all cleints id
// let socketsConnected = new Set();
// io.on("connnection", onConnected);


// function onConnected(socket) {
//   console.log(socket.io)
//   // adding to set the new client
//   socketsConnected.add(socket.id)
//   //these io.emit events should be handled at //the front end in main.js also
//   io.emit("clients-total", socketsConnectd.size)

//   //when a client disonnects (imp, its socket.on not io.on), removign it from set adn informing all clients
//   socket.on("disconnect", ()=> {
//     console.log("socket disconnected", socket.id)
//     socketsConnected.delete(socket.id)
//     io.emit("clients-total", socketsConnectd.size)
//   })

//   socket.on("message", (data) => {
//     console.log(data);
//     socket.broadcast.emit("chat-message", data)
//   })
// }


// socket.on("feedback", (data) => {
//   socket.broadcast.emit("feedback", data)
// })


const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`💬 server on port ${PORT}`));

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

let socketsConected = new Set();

io.on("connection", onConnected);

function onConnected(socket) {
  // console.log("Socket connected", socket.id);
  socketsConected.add(socket.id);
  io.emit("clients-total", socketsConected.size);

  socket.on("disconnect", () => {
    // console.log("Socket disconnected", socket.id);
    socketsConected.delete(socket.id);
    io.emit("clients-total", socketsConected.size);
  });

  socket.on("message", (data) => {
    // console.log(data)
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("feedback", (data) => {
    socket.broadcast.emit("feedback", data);
  });
}
