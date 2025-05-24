import mongoose, { Schema, model, models } from 'mongoose';

const chatSchema = new Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true }, // add recipient
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Chat = models.Chat || model('Chat', chatSchema);
export default Chat;