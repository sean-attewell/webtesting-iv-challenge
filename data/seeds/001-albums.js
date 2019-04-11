
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('albums').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('albums').insert([
        { title: 'Obzen', genre: 'Djent', releaseYear:'2008'},
        { title: 'Colors', genre: 'Prog Metal', releaseYear:'2007'},
        { title: 'Option Paralysis', genre: 'Mathcore', releaseYear:'2010'}
      ]);
    });
};
