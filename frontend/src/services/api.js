import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const login = async (username) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, { username });
  return data.user;
};

export const fetchAllUsers = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
  return data.users;
};

export const fetchConversations = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/conversations/${userId}`);
  return data.conversations;
};

export const fetchMessages = async (conversationId) => {
  const { data } = await axios.get(`${BASE_URL}/messages/${conversationId}`);
  return data.messages;
};
