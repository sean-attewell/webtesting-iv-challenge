exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', tbl => {
    tbl.increments();

    tbl.string('title', 255).notNullable();
    tbl.string('genre', 255).notNullable();
    tbl.string('releaseYear', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('albums');
};
