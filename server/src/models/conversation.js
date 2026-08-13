import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: {
        validator: function (value) {
          return (
            value.length === 2 && value[0].toString() !== value[1].toString()
          );
        },
        message: "A conversation must have exactly 2 different participants",
      },
      required: true,
    },

    lastMessage: {
      type: String,
      default: "",
      trim: true,
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
