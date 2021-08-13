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
  deleteMessage: async ({ userid, id }) => {
    await Message.query().where('sender_id', userid).where('id', id).del();
  },
  editMessage: async ({ id, text }) => {
    await Message.query().patch({ text }).findById(id);
  },
};

module.exports = MessageDAO;
