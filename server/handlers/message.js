const { v4: uuidv4 } = require('uuid');
const { EVENTS } = require('../constants');
const { MessageDAO } = require('../db');

const registerMessageHandlers = (socket, io) => {
  const getMessages = async () => {
    const messages = await MessageDAO.getMessages();
    io.emit(EVENTS.MESSAGE.return, messages);
  };
  const addMessage = async (message) => {
    await MessageDAO.addMessage(message);

    getMessages();
  };

  const deleteMessage = async (id) => {
    await MessageDAO.deleteMessage(id);

    getMessages();
  };
  const editMessage = async ({ id, text }) => {
    await MessageDAO.editMessage({ id, text });

    getMessages();
  };

  socket.on(EVENTS.MESSAGE.get, getMessages);
  socket.on(EVENTS.MESSAGE.add, addMessage);
  socket.on(EVENTS.MESSAGE.delete, deleteMessage);
  socket.on(EVENTS.MESSAGE.edit, editMessage);
};

module.exports = registerMessageHandlers;
