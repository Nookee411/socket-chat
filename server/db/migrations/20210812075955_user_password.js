exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('password');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('password');
  });
};
