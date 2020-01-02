const client = require('./index.js');

let queryStr = `SELECT * FROM reviews;`;
client.dbConnection.query(queryStr, (err, res) => {
  if (err) { console.error(err); }
  console.log(res.rows);
  process.exit();
});