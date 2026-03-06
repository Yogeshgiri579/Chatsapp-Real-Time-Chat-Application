const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'Conversation ID is required'],
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required'],
    },
    senderName: { type: String },
    senderColor: { type: String },
    text: { type: String, required: [true, 'Message text is required'], trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
