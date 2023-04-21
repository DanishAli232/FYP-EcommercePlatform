import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true },
    vendor: { type: String, required: true },
    chat: { text: { type: String } },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
