const EVENTS = {
  USER: {
    login: 'user:login',
    register: 'user:register',
  },
  MESSAGE: {
    return: 'messages',
    add: 'message:add',
    get: 'message:get',
    delete: 'message:remove',
    edit: 'message:edit',
  },
};

module.exports = EVENTS;
