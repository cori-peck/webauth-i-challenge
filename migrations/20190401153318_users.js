
exports.up = function(knex) {
  return knex.schema.createTable('users', function(tbl) {
      tbl.increments();
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 72).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
