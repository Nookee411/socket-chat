import socket from '../utils/socket';

const MessageController = {
  sendMessage: ({ text, senderName }) => {
    socket.emit('message:add', { text, senderName });
  },
  getMessages: (username) => {
    socket.emit('message:get', { username });
  },
  deleteMessage: (userid, id) => {
    socket.emit('message:remove', { userid, id });
  },
  editMessage: (id, text) => {
    socket.emit('message:edit', { id, text });
  },
};

export default MessageController;
