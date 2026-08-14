import ConversationModel from "../models/conversation.js";

export default async function findOrCreateConversation(senderId, receiverId) {
  try {
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (conversation) console.log(conversation._id, "Old Conversation ID");
    if (conversation) return conversation._id;

    conversation = await ConversationModel.create({
      participants: [senderId, receiverId],
    });

    console.log(conversation._id, "New Conversation ID Generated");

    return conversation._id;
  } catch (error) {
    throw error;
  }
}
