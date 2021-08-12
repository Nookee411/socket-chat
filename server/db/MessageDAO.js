const Message = require('../models/Message');
const UserDAO = require('./UserDAO');

const MessageDAO = {
  getMessages: async () => {
    const messages = await Message.query()
      .orderBy('messages.created_at')
      .joinRelated('users')
      .select('messages.*', 'users.name');
    return messages;
  },
  addMessage: async ({ text, senderName }) => {
    const sender = await UserDAO.getUserByName(senderName);
    const res = await Message.query().insert({
      text,
      sender_id: sender.id,
    });
    return res;
  },
  deleteMessage: async ({ id }) => {
    await Message.query().deleteById(id);
  },
};

module.exports = MessageDAO;
