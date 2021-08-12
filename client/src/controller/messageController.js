import socket from '../utils/socket';

const MessageController = {
  sendMessage: ({ text, senderName }) => {
    socket.emit('message:add', { text, senderName });
  },
  getMessages: (username) => {
    socket.emit('message:get', { username });
  },
  deleteMessage: (id) => {
    socket.emit('message:remove', { id });
  },
};

export default MessageController;
