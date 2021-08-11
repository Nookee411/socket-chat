const User = require('../models/User');
const UserDAO = {
  addUser: async (user) => {
    const res = await User.query().insert(user);
    console.log(res);
  },
  getUserById: async (id) => {
    const user = await User.query().findById(id);
    return user;
  },
  getUserByName: async (name) => {
    console.log(name);
    const user = await User.query().findOne({
      name,
    });
    return user;
  },
};

module.exports = UserDAO;
