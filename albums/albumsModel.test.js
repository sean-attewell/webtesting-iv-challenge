const db = require('../data/dbConfig.js');
const Albums = require('./albumsModel')

describe('albumsModel', () => {

  afterEach(async () => {
    await db('albums').truncate();
  })

  describe('insert', () => {
    it('inserts albums into db', async () => {
      const newAlbum = await Albums.insert({ title: 'Obzen', genre: 'Djent', releaseYear:'2008' });
      expect(newAlbum.title).toBe('Obzen')
      expect(newAlbum.genre).toBe('Djent')
      expect(newAlbum.releaseYear).toBe('2008')
      expect(newAlbum).toEqual({ id: 1, title: 'Obzen', genre: 'Djent', releaseYear:'2008' });
    })
  })

  describe('delete', () => {
    it('deletes albums correctly', async () => {
      const newAlbum1 = await Albums.insert({ title: 'Obzen', genre: 'Djent', releaseYear:'2008' });
      await Albums.insert({ title: 'Colors', genre: 'Prog Metal', releaseYear:'2007' });

      const numberDeleted = await Albums.remove(newAlbum1.id)
      expect(numberDeleted).toBe(1);

      const allAlbums = await Albums.getAll();
      expect(allAlbums).toHaveLength(1)


    })
  })
});