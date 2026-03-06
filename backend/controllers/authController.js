const User = require('../models/User');
const Conversation = require('../models/Conversation');

const login = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username?.trim()) {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }

        const trimmed = username.trim();

        let user = await User.findOne({ username: trimmed });
        const isNewUser = !user;

        if (!user) {
            user = await User.create({ username: trimmed });
        }

        if (isNewUser) {
            const allOthers = await User.find({ _id: { $ne: user._id } });

            for (const other of allOthers) {
                const exists = await Conversation.findOne({
                    isGroup: false,
                    participants: { $all: [user._id, other._id], $size: 2 },
                });
                if (!exists) {
                    await Conversation.create({
                        isGroup: false,
                        participants: [user._id, other._id],
                    });
                }
            }

            let globalChat = await Conversation.findOne({ isGroup: true, name: 'Global Chat' });
            if (!globalChat) {
                globalChat = await Conversation.create({
                    isGroup: true,
                    name: 'Global Chat',
                    participants: [user._id],
                });
            } else if (!globalChat.participants.includes(user._id)) {
                globalChat.participants.push(user._id);
                await globalChat.save();
            }

            req.io?.emit('new_user_joined', user.toPublicJSON());
        }

        res.json({ success: true, user: user.toPublicJSON() });
    } catch (error) {
        if (error.code === 11000) {
            const existing = await User.findOne({ username: req.body.username?.trim() });
            if (existing) return res.json({ success: true, user: existing.toPublicJSON() });
        }
        console.error('[authController.login]', error.message);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

module.exports = { login };
