exports.up = async (knex) => {
  await knex.schema.createTable('users', function (table) {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name', 50);
  });

  return knex.schema.createTable('messages', function (table) {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('text', 1000);
    table.uuid('sender_id', 50);

    table.foreign('sender_id').references('id').inTable('users');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('messages');
  return knex.schema.dropTableIfExists('users');
};
