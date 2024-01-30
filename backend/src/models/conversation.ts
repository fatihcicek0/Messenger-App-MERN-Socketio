import mongoose from"mongoose";
import IConversation from "../interfaces/conversation";


const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model<IConversation>("Conversation", ConversationSchema);