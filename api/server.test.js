const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig.js');

describe('server', () => {

  describe('GET / endpoint', () => {

    it('is the right enviornment', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    it('responds with proper status code', () => {
      return request(server)
        .get('/')
        .expect(200);
    });

    it('returns the right response body', () => { 
      const expectedResponseBody = JSON.stringify({ api: 'up'});
      return request(server)
        .get('/')
        .expect(expectedResponseBody)
        .expect('Content-Length', expectedResponseBody.length.toString())
    });
  })

  describe('GET /albums endpoint', ()=> {

    afterEach(async () => {
      await db('albums').truncate();
    })

    it('responds with the correct status code', async () => {
      const res = await request(server).get('/albums')
      expect(res.status).toBe(200)
    })

    it('returns the right response body ', async () => {

      const res = await request(server).get('/albums');
      expect(res.body).toHaveLength(0) // testdb doesn't have any
      expect(res.body).toEqual([]) // return empty array

    });

  })

  describe('POST /albums endpoint', () => {

    afterEach(async () => {
      await db('albums').truncate();
    })

    it("returns the right response body", () => {
      const album = { title: 'Obzen', genre: 'Djent', releaseYear:'2008' };
      const expectedResponseBody = {id: 1, title: 'Obzen', genre: 'Djent', releaseYear:'2008' };
      return request(server)
        .post(`/albums`)
        .send(album)
        .expect(expectedResponseBody)
        .expect('Content-Type', /json/)
    });

    it("returns correct status code on success", () => {
      const album = { title: 'Obzen', genre: 'Djent', releaseYear:'2008' };
      return request(server)
        .post(`/albums`)
        .send(album)
        .expect(201)
    });
  })

  describe('DELETE /albums/:id endpoint', () => {
    afterEach(async () => {
      await db('albums').truncate();
    })

    it("returns correct status code on success", async () => {
      const album = { title: 'Obzen', genre: 'Djent', releaseYear:'2008' };
      const res = await request(server).post(`/albums`).send(album);
      const newAlbum = res.body;
      expect(newAlbum).toEqual({ id: 1, title: 'Obzen', genre: 'Djent', releaseYear:'2008' });

      return request(server)
        .delete(`/albums/1`)
        .expect(200);
    });

    it("returns correct status code on failure", () => {
      return request(server)
        .delete(`/api/users/32`)
        .expect(404);
    });
  })

})


// easter egg
// const newAlbum = JSON.parse(res.text); seems to work, turns string into JSON
