import dotenv from "dotenv/config";
import app from "../app.js";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import config from "../Utils/config.js";

mongoose.set("strictQuery", false);
import { addUser, removeUser, getUser, getUsersInRoom } from "../chatUsers.js";

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const messages = [];

//Socket
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    messages.push(data);
    io.emit("receiveMessage", data);
  });

  socket.on("join", ({ userID, vendorID }, callback) => {
    console.log({ userID, vendorID });
    const { error, user } = addUser({ id: socket.id, userID, vendorID });
    console.log({ error, user });
    if (error) return callback(error);

    const roomId = `${userID}_${vendorID}`;

    // Join the room
    socket.join(roomId);

    // Notify the user and the vendor that they have joined the room
    io.to(roomId).emit("roomJoined", { roomId });

    console.log(`User ${userID} and Vendor ${vendorID} joined room ${roomId}`);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log(message);
    const user = getUser(socket.id);
    console.log(user);

    io.to(33).emit("message", { user: "dan", text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => console.log(err));
}
