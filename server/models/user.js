const db = require('../db');

module.exports = {
  findAll: () => db('users').select('*'),
  findById: (id) => db('users').where({ id }).first(),
  findByEmail: (email) => db('users').where({ email }).first(),
  create: (user) => db('users').insert(user).returning('*'),
};
