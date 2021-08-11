const { v4: uuidv4 } = require('uuid');
const { UserDAO } = require('../db');

const registerUserHandlers = (socket, io) => {
  const getUserByName = async ({ name }) => {
    const user = await UserDAO.getUserByName(name);
    console.log(user);
    socket.emit('user', user);
  };
  const addUser = (user) => {
    console.log(user);
    UserDAO.addUser(user);
  };

  socket.on('user:find', getUserByName);
  socket.on('user:add', addUser);
};

module.exports = registerUserHandlers;
