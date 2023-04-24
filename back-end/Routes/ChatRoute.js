import express from "express";
import {
  chatCustomer,
  chatCustomerUsers,
} from "../Controllers/ChatController.js";

var ChatRouter = express.Router();

ChatRouter.get("/chatcustomers/:id", chatCustomer);
ChatRouter.get("/chatcustomersusers/:id", chatCustomerUsers);

export default ChatRouter;
