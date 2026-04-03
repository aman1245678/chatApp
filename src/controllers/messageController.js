// controllers/messageController.js

import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ msg: "Invalid data" });
  }

  let message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
  });

  // 🔥 IMPORTANT POPULATE (THIS WAS MISSING)
  message = await message.populate("sender", "name");
  message = await message.populate("chat");
  message = await message.populate("chat.users", "name email");

  // update latest message
  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });

  res.json(message);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name email")
    .populate("chat");

  res.json(messages);
};