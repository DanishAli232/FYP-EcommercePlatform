import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User1",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    chat: [{ text: { type: String }, sender: { type: String } }],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
