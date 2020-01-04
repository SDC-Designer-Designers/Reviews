const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews-zip',
  password: 'hackreactor',
  port: 5432
});

client.connect()
  .then(() => {
    console.log('Postgres connection created');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = client;