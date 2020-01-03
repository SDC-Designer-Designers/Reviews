const client = require('./index.js');

//Get-reviews
module.exports.getReviews = (listingId) => {
  return new Promise((resolve, reject) => {
    let queryStr = `SELECT * FROM reviews where listingId=${listingId};`;
    console.log(queryStr);
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });
};

//Get-zipcodes
module.exports.getZipcode = (listingId) => {
  return new Promise((resolve, reject) => {
    let queryStr = `SELECT * FROM zipcode where listingId=${listingId};`;
    console.log(queryStr);
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });
};