const { v4: uuidv4 } = require('uuid');
const { MessageDAO } = require('../db');

const registerMessageHandlers = (socket, io) => {
  const getMessages = async () => {
    const messages = await MessageDAO.getMessages();
    io.emit('messages', messages);
  };
  const addMessage = async (message) => {
    await MessageDAO.addMessage(message);

    getMessages();
  };

  const deleteMessage = async (id) => {
    await MessageDAO.deleteMessage(id);

    getMessages();
  };

  socket.on('message:get', getMessages);
  socket.on('message:add', addMessage);
  socket.on('message:remove', deleteMessage);
};

module.exports = registerMessageHandlers;
