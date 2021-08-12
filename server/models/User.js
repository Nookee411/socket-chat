const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const Message = require('./Message');
    return {
      messages: {
        relation: Model.BelongsToOneRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.sender_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      requred: ['name', 'password'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
      },
    };
  }
}

module.exports = User;
