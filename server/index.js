const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await db('users').insert({ name, email, password }).returning('*');

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

  res.json({ token });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await db('users').where({ email, password }).first();

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
