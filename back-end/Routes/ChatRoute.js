import express from "express";

var ChatRouter = express.Router();

ChatRouter.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

export default ChatRouter;
