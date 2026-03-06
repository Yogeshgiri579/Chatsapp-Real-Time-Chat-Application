const RANDOM_MESSAGES = [
  "That makes sense.",
  "I'll look into it right now.",
  "Can we jump on a quick call later?",
  "LGTM! 🚀",
  "Exactly what I was thinking.",
  "Let me check the logs.",
  "Sure, no problem.",
  "Thanks for the update.",
  "Should be deployed in 5 mins.",
  "Haha valid point.",
];

export const connectWebSocket = ({ onMessage, currentUser, conversations }) => {
  let intervalId = null;
  let closed = false;

  const getRandomDelay = () => Math.floor(Math.random() * 10000) + 6000;

  const scheduleNext = () => {
    if (closed) return;
    intervalId = setTimeout(() => {
      if (closed) return;

      if (conversations && conversations.length > 0) {
        // Pick a random conversation
        const chat = conversations[Math.floor(Math.random() * conversations.length)];
        // Pick a participant from that chat
        const participants = chat.participants;
        const sender = participants[Math.floor(Math.random() * participants.length)];
        
        const text = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];

        const message = {
          id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          chatId: chat.id,
          senderId: sender.id,
          senderName: sender.name,
          senderColor: sender.color,
          text,
          timestamp: new Date().getTime(),
          isOwn: false,
        };

        onMessage(message);
      }
      scheduleNext();
    }, getRandomDelay());
  };

  setTimeout(scheduleNext, 3000);

  return {
    send: (messageData) => {
      console.log('[MockWS] Message sent to server:', messageData);
    },
    close: () => {
      closed = true;
      if (intervalId) clearTimeout(intervalId);
    },
  };
};
