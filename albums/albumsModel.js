const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll
};

async function insert(album) {
  const [id] = await db('albums').insert(album);
  return await db('albums').where({ id }).first();
}

async function remove(id) {
  return db('albums').where({ id }).delete();
}

function getAll() {
  return db('albums');
}

