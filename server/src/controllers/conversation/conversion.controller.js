import ConversationModel from "../../models/conversation.js";

export default async function conversation(req, res, next) {
  try {
    const conversations = await ConversationModel.find({
      participants: req.user._id,
    })
      .sort({ lastMessageAt: -1 })
      .populate({
        path: "participants",
        select: "name username avatar isOnline lastSeen",
      });

    if (!conversations.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No conversations found",
      });
    }

    return res.status(200).json({
      success: true,
      data: conversations,
      message: "Conversations fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}
