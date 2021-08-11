const Message = require('../models/Message');
const UserDAO = require('./UserDAO');

const MessageDAO = {
  getMessages: async () => {
    const messages = await Message.query()
      .innerJoinRelated('user')
      .where('user.id', 'messages.sender_id');
    console.log(messages);
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
};

module.exports = MessageDAO;
