const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '34.222.55.239',
  database: 'reviews-zip',
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