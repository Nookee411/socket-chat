const { Model } = require('objection');

class Message extends Model {
  static get tableName() {
    return 'messages';
  }
  static get relationMappings() {
    const User = require('./User');

    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'messages.sender_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Message;
