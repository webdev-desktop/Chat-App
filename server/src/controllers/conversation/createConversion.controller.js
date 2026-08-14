import Conversation from "../../models/conversation.js";
import UserModel from "../../models/user.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import userResponse from "../../utils/userResponse.js";

export default async function createConversation(req, res, next) {
  try {
    const receiverId = req.body?._id?.trim();

    if (!receiverId)
      return next(new ErrorHandler("Receiver ID is required", 400));

    const receiver = await UserModel.findById(receiverId).lean();

    if (!receiver) return next(new ErrorHandler("User not found", 404));

    if (req.user._id.toString() === receiver._id.toString())
      return next(
        new ErrorHandler("You cannot create a conversation with yourself", 400)
      );

    const conversation = await ConversationModel.findOne({
      participants: { $all: [req.user._id, receiver._id] },
    });

    if (conversation) return console.log(conversation);
  } catch (error) {
    next(error);
  }
}
