const express = require('express');
const cors = require('cors');
const axios = require('axios');
const database = require('./db.js');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());

app.use(cors());




database.raw('SELECT 1')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });


  app.get('/easy', async (req, res) => {
    const easyTask = await database('problems').where({
        difficulty: 'Easy',
      })
      .select('*');
      res.json(easyTask);
  });

  app.get('/medium', async (req, res) => {
    const mediumTask = await database('problems').where({
        difficulty: 'Medium',
      })
      .select('*');
      res.json(mediumTask);
  });

  app.get('/hard', async (req, res) => {
    const hardTask = await database('problems').where({
        difficulty: 'Hard',
      })
      .select('*');
      res.json(hardTask);
  });
  app.get('/all', async (req, res) => {
    const allTask = await database('problems').select('*');
      res.json(allTask);
  });

  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    const user = await database('users').insert({ name, email, password }).returning('*');
  
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
  
    res.json({ token });
  });
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await database('users').where({ email, password }).first();
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
  
    res.json({ token });
  });
  
  app.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
  
    const token = jwt.verify(refreshToken, 'secret');
  
    if (!token) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
  
    const newToken = jwt.sign({ id: token.id }, 'secret', { expiresIn: '1h' });
  
    res.json({ newToken });
  });
  

app.listen(3001, () => {
    console.log("Server running on port  3001");
});
