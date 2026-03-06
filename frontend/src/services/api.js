const USER_COLORS = [
  '#53bdeb', '#ff7a59', '#25d366', '#a78bfa',
  '#f43f5e', '#14b8a6', '#f59e0b', '#d946ef',
];

const MOCK_CURRENT_USER_ID = 'me';

const MOCK_CONVERSATIONS = [
  {
    id: 'chat_frontend',
    isGroup: true,
    name: 'Frontend Team',
    avatar: 'FT',
    color: '#14b8a6',
    lastMessage: 'Great work everyone, ship it!',
    timestamp: new Date().getTime() - 1000 * 60 * 5,
    unread: 2,
    participants: [
      { id: 'u1', name: 'Alex', color: '#53bdeb' },
      { id: 'u2', name: 'Morgan', color: '#ff7a59' },
      { id: 'u3', name: 'Casey', color: '#a78bfa' }
    ]
  },
  {
    id: 'chat_u1',
    isGroup: false,
    name: 'Alex Developer',
    avatar: 'AD',
    color: '#53bdeb',
    lastMessage: 'Are we using Context or Redux?',
    timestamp: new Date().getTime() - 1000 * 60 * 30,
    unread: 0,
    participants: [{ id: 'u1', name: 'Alex Developer', color: '#53bdeb' }]
  },
  {
    id: 'chat_u2',
    isGroup: false,
    name: 'Morgan Smith',
    avatar: 'MS',
    color: '#ff7a59',
    lastMessage: 'Can you review my PR?',
    timestamp: new Date().getTime() - 1000 * 60 * 60 * 2,
    unread: 0,
    participants: [{ id: 'u2', name: 'Morgan Smith', color: '#ff7a59' }]
  },
  {
    id: 'chat_design',
    isGroup: true,
    name: 'Design Catchup',
    avatar: 'DC',
    color: '#f43f5e',
    lastMessage: 'The new spacing looks much better.',
    timestamp: new Date().getTime() - 1000 * 60 * 60 * 24,
    unread: 0,
    participants: [
      { id: 'u4', name: 'Riley', color: '#f59e0b' },
      { id: 'u5', name: 'Jordan', color: '#d946ef' }
    ]
  }
];

// Initial mock messages keyed by chatId
const MOCK_MESSAGES = {
  chat_frontend: [
    { id: 'm1', senderId: 'u1', senderName: 'Alex', senderColor: '#53bdeb', text: 'Hey team, UI is almost done.', timestamp: new Date().getTime() - 1000 * 60 * 10, isOwn: false },
    { id: 'm2', senderId: MOCK_CURRENT_USER_ID, text: 'Looks awesome! Did you fix the sidebar?', timestamp: new Date().getTime() - 1000 * 60 * 8, isOwn: true },
    { id: 'm3', senderId: 'u2', senderName: 'Morgan', senderColor: '#ff7a59', text: 'Great work everyone, ship it!', timestamp: new Date().getTime() - 1000 * 60 * 5, isOwn: false }
  ],
  chat_u1: [
    { id: 'm4', senderId: MOCK_CURRENT_USER_ID, text: 'Let me know when you start on state management.', timestamp: new Date().getTime() - 1000 * 60 * 35, isOwn: true },
    { id: 'm5', senderId: 'u1', senderName: 'Alex Developer', senderColor: '#53bdeb', text: 'Are we using Context or Redux?', timestamp: new Date().getTime() - 1000 * 60 * 30, isOwn: false }
  ],
  chat_u2: [
    { id: 'm6', senderId: 'u2', senderName: 'Morgan Smith', senderColor: '#ff7a59', text: 'Can you review my PR?', timestamp: new Date().getTime() - 1000 * 60 * 60 * 2, isOwn: false }
  ],
  chat_design: [
    { id: 'm7', senderId: 'u4', senderName: 'Riley', senderColor: '#f59e0b', text: 'I updated the Figma file.', timestamp: new Date().getTime() - 1000 * 60 * 60 * 25, isOwn: false },
    { id: 'm8', senderId: 'u5', senderName: 'Jordan', senderColor: '#d946ef', text: 'The new spacing looks much better.', timestamp: new Date().getTime() - 1000 * 60 * 60 * 24, isOwn: false }
  ]
};

let userIdCounter = 100;

export const login = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: MOCK_CURRENT_USER_ID,
        username: username.trim(),
        color: '#00a884',
      });
    }, 500);
  });
};

export const fetchConversations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(MOCK_CONVERSATIONS)));
    }, 300);
  });
};

export const fetchMessages = (chatId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(MOCK_MESSAGES[chatId] || [])));
    }, 200);
  });
};
