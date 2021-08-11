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
        relation: Model.HasManyRelation,
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
      requred: ['name'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
      },
    };
  }
}

module.exports = User;
