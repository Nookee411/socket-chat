const { UserDAO } = require('../db');
const bcrypt = require('bcrypt');

const registerUserHandlers = (socket, io) => {
  const registerUser = ({ name, password }) => {
    //Todo check if user already exists
    const hashedPassword = bcrypt.hashSync(password, 10);
    UserDAO.addUser({ name, password: hashedPassword });
  };

  const loginUser = async ({ name, password }) => {
    console.log(name, password);
    const user = await UserDAO.getUserByName(name);
    if (!user) return socket.emit('user', null);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return socket.emit('user', null);
    socket.emit('user', user);
  };

  socket.on('user:login', loginUser);
  socket.on('user:add', registerUser);
};

module.exports = registerUserHandlers;
