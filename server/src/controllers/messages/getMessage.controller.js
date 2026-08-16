import mongoose from "mongoose";
import ConversationModel from "../../models/conversation.js";
import MessageModel from "../../models/message.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import response from "../../utils/response.js";

export default async function getMessage(req, res, next) {
  try {
    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId))
      return next(new ErrorHandler("Invalid conversation ID", 400));

    const conversation = await ConversationModel.findOne({
      _id: conversationId,
      participants: req.user._id,
    });

    if (!conversation)
      return next(
        new ErrorHandler("You are not a participant of this conversation", 403)
      );

    await MessageModel.updateMany(
      {
        conversationId,
        receiverId: req.user._id,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      }
    );

    const messages = await MessageModel.find({
      conversationId,
    }).sort({ createdAt: 1 });

    response(res, messages, "All Messages", 200);
  } catch (error) {
    next(error);
  }
}
