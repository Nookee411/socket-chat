const User = require('../models/User');
const UserDAO = {
  addUser: async ({ name, password }) => {
    console.log(await User.query().insert({ name, password }));
  },
  getUserById: async (id) => {
    const user = await User.query().findById(id);
    return user;
  },
  getUserByName: async (name) => {
    const user = await User.query().findOne({
      name,
    });
    return user;
  },
};

module.exports = UserDAO;
