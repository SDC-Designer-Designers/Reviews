const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '38.140.216.106',
  database: 'reviews-zip',
  password: '',
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