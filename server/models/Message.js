const { Model } = require('objection');

class Message extends Model {
  static get tableName() {
    return 'messages';
  }
  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
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
