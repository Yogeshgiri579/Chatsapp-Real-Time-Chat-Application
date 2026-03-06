const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Username must be at least 2 characters'],
      maxlength: [30, 'Username must be at most 30 characters'],
    },
    color: {
      type: String,
      default: () => {
        const colors = ['#ec4899', '#f97316', '#14b8a6', '#6366f1', '#a855f7', '#f43f5e', '#3b82f6', '#10b981'];
        return colors[Math.floor(Math.random() * colors.length)];
      },
    },
    online: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id.toString(),
    username: this.username,
    color: this.color,
    online: this.online,
    lastSeen: this.lastSeen,
  };
};

module.exports = mongoose.model('User', userSchema);
