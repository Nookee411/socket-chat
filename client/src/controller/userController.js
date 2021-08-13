import socket from '../utils/socket';

const UserController = {
  loginUser: (name, password) => {
    socket.emit('user:login', { name, password });
  },
  registerUser: (name, password) => {
    socket.emit('user:register', { name, password });
  },
};

export default UserController;
