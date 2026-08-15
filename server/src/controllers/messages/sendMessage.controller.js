import mongoose from "mongoose";
import findOrCreateConversation from "../../helper/findOrCreateConversation.js";
import ConversationModel from "../../models/conversation.js";
import MessageModel from "../../models/message.js";
import UserModel from "../../models/user.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import response from "../../utils/response.js";

export default async function sendMessage(req, res, next) {
  try {
    const receiverId = req.body?._id?.trim();
    const message = req.body?.message?.trim();

    if (!receiverId)
      return next(new ErrorHandler("Receiver ID is required", 400));

    if (!message) return next(new ErrorHandler("Message is required", 400));

    if (!mongoose.Types.ObjectId.isValid(receiverId))
      return next(new ErrorHandler("Invalid receiver ID", 400));

    const receiver = await UserModel.findById(receiverId).lean();

    if (!receiver) return next(new ErrorHandler("User not found", 404));

    if (req.user._id.toString() === receiver._id.toString())
      return next(
        new ErrorHandler("You cannot send a message to yourself", 400)
      );

    const conversationId = await findOrCreateConversation(
      req.user._id,
      receiver._id
    );

    const newMessage = await MessageModel.create({
      conversationId,
      senderId: req.user._id,
      receiverId: receiver._id,
      message,
      delivered: true,
    });

    console.log(conversationId);

    const conversation = await ConversationModel.updateOne(
      { _id: conversationId },
      {
        lastMessage: {
          messageId: newMessage._id,
          message,
          senderId: req.user._id,
        },
        lastMessageAt: new Date(),
      }
    );

    response(res, newMessage, "New Message", 201);
  } catch (error) {
    next(error);
  }
}
