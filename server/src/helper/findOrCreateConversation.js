import ConversationModel from "../models/conversation.js";

export default async function findOrCreateConversation(senderId, receiverId) {
  const oldConversation = await ConversationModel.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (oldConversation) console.log(oldConversation._id, "Old Conversation ID");
  if (oldConversation) return oldConversation._id;

  const newConversation = await ConversationModel.create({
    participants: [senderId, receiverId],
  });

  console.log(newConversation._id, "New Conversation ID Generated");

  return newConversation._id;
}
