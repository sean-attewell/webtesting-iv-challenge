const express = require('express');

const Albums = require('../albums/albumsModel.js');

const server = express();
server.use(express.json());


server.get('/', async (req, res) => {
  // const message = req.query.name
  //   ? `welcome, ${req.query.name}`
  //   : 'up';

  // res.set('Set-Cookie', 'know=true');
  res.status(200).json({ api: "up" });
});

server.get('/albums', async (req, res) => {
  const rows = await Albums.getAll();

  res.status(200).json(rows);
});

server.post('/albums', async (req, res) => {
  if (!req.body.title || !req.body.genre) {
      res.status(422).json({ errorMessage: "Please provide title and genre for the project." });
  } else {
  try {
      const album = await Albums.insert(req.body);
      res.status(201).json(album);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the album to the database" });
  }
}});

server.delete('/albums/:id', async (req, res) => {
  try {
      const numberDeleted = await Albums.remove(req.params.id);
      if (numberDeleted > 0) {
          res.status(200).json({ message: `Album ${req.params.id} has been deleted.` });
      } else {
          res.status(404).json({ message: `The album with ID ${req.params.id} does not exist.` });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "The album could not be removed" });
  }
});

module.exports = server;
