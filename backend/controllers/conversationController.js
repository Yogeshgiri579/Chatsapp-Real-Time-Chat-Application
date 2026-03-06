const Conversation = require('../models/Conversation');

const getConversations = async (req, res) => {
    try {
        const { userId } = req.params;

        const convos = await Conversation.find({ participants: userId })
            .populate('participants', 'username color lastSeen')
            .sort({ lastAt: -1 })
            .lean();

        const onlineIds = req.onlineSockets
            ? new Set([...req.onlineSockets.values()])
            : new Set();

        const result = convos.map((c) => {
            let name, color, avatar, otherParticipant;

            if (!c.isGroup) {
                otherParticipant = c.participants.find((p) => p._id.toString() !== userId);
                name = otherParticipant?.username || 'Unknown';
                color = otherParticipant?.color || '#ec4899';
                avatar = name.slice(0, 2).toUpperCase();
            } else {
                name = c.name || 'Group Chat';
                color = '#14b8a6';
                avatar = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
            }

            const participantsMapped = c.participants.map((p) => ({
                id: p._id.toString(),
                name: p.username,
                color: p.color,
                online: onlineIds.has(p._id.toString()),
            }));

            return {
                id: c._id.toString(),
                isGroup: c.isGroup,
                name,
                avatar,
                color,
                lastMessage: c.lastMessage || '',
                timestamp: c.lastAt ? new Date(c.lastAt).getTime() : Date.now(),
                unread: 0,
                participants: participantsMapped,
                online: c.isGroup ? null : onlineIds.has(otherParticipant?._id?.toString()),
                partnerId: c.isGroup ? null : otherParticipant?._id?.toString() || null,
            };
        });

        res.json({ success: true, conversations: result });
    } catch (error) {
        console.error('[conversationController.getConversations]', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch conversations' });
    }
};

module.exports = { getConversations };
