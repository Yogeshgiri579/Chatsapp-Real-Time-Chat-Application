const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 })
            .lean();

        const result = messages.map((m) => ({
            id: m._id.toString(),
            chatId: m.conversationId.toString(),
            senderId: m.senderId.toString(),
            senderName: m.senderName,
            senderColor: m.senderColor,
            text: m.text,
            timestamp: new Date(m.createdAt).getTime(),
        }));

        res.json({ success: true, messages: result });
    } catch (error) {
        console.error('[messageController.getMessages]', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
};

const saveMessage = async ({ conversationId, senderId, senderName, senderColor, text }) => {
    const msg = await Message.create({ conversationId, senderId, senderName, senderColor, text });

    await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: text,
        lastAt: new Date(),
    });

    return {
        id: msg._id.toString(),
        chatId: msg.conversationId.toString(),
        senderId: msg.senderId.toString(),
        senderName: msg.senderName,
        senderColor: msg.senderColor,
        text: msg.text,
        timestamp: new Date(msg.createdAt).getTime(),
    };
};

module.exports = { getMessages, saveMessage };
