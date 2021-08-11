const { v4: uuidv4 } = require('uuid');
const { MessageDAO } = require('../db');

const registerMessageHandlers = (socket, io) => {
  const getMessages = async () => {
    const messages = await MessageDAO.getMessages();
    io.emit('messages', messages);
  };
  const addMessage = (message) => {
    MessageDAO.addMessage(message);
    getMessages();
  };

  socket.on('message:get', getMessages);
  socket.on('message:add', addMessage);
};

module.exports = registerMessageHandlers;
