const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    isGroup: { type: Boolean, default: false },
    name: { type: String, trim: true },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    lastMessage: { type: String, default: '' },
    lastAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

conversationSchema.index({ isGroup: 1, participants: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
