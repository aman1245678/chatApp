// src/controllers/chatController.js
import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  const { userId } = req.body;

  const chat = await Chat.create({
    users: [req.user._id, userId]
  });

  res.json(chat);
};

export const getChats = async (req, res) => {
  const chats = await Chat.find({
    users: { $in: [req.user._id] }
  })
    .populate("users", "-password")
    .populate("latestMessage");

  res.json(chats);
};