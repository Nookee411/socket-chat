const { UserDAO } = require('../db');
const bcrypt = require('bcrypt');
const { EVENTS } = require('../constants');

const registerUserHandlers = (socket, io) => {
  const registerUser = async ({ name, password }) => {
    //Todo check if user already exists
    const user = await UserDAO.getUserByName(name);
    if (user)
      return socket.emit(EVENTS.USER.register, {
        success: false,
        data: 'User already exists',
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    UserDAO.addUser({ name, password: hashedPassword });
  };

  const loginUser = async ({ name, password }) => {
    const user = await UserDAO.getUserByName(name);
    if (!user)
      return socket.emit(EVENTS.USER.login, {
        success: false,
        data: 'No such user found',
      });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return socket.emit(EVENTS.USER.login, {
        success: false,
        data: 'Password or username incorrect',
      });
    socket.emit(EVENTS.USER.login, {
      success: true,
      data: user,
    });
  };

  socket.on(EVENTS.USER.login, loginUser);
  socket.on(EVENTS.USER.register, registerUser);
};

module.exports = registerUserHandlers;
