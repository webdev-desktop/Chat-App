import ConversationModel from "../../models/conversation.js";
import response from "../../utils/response.js";

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

    const formattedConversations = conversations.map((conversation) => {
      const otherUser = conversation.participants.find(
        (user) => user._id.toString() !== req.user._id.toString()
      );

      return {
        conversationId: conversation._id,
        user: otherUser,
        lastMessage: conversation.lastMessage,
        lastMessageAt: conversation.lastMessageAt,
      };
    });

    response(
      res,
      formattedConversations,
      "Conversations fetched successfully",
      200
    );
  } catch (error) {
    next(error);
  }
}
