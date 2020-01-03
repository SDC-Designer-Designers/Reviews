const client = require('./index.js');

//Get-reviews
module.exports.getReviews = (listingId) => {
  return new Promise((resolve, reject) => {
    let queryStr = `SELECT * FROM reviews where listingId=${listingId};`;
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
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });
};

//Post-reviews
module.exports.postReview = ({rating, stayDate, title, review, postDate, author, authorLocation, ownerResponse, listingId}) => {
  let queryStr;
  return new Promise((resolve, reject) => {
    if (ownerResponse) {
      queryStr = `INSERT INTO reviews(rating, stayDate, title, review, postDate, author, authorLocation, ownerResponse, listingId) VALUES(${rating}, '${stayDate}', '${title}', '${review}', '${postDate}', '${author}', '${authorLocation}', '${ownerResponse}', ${listingId});`;
    } else {
      queryStr = `INSERT INTO reviews(rating, stayDate, title, review, postDate, author, authorLocation, listingId) VALUES(${rating}, '${stayDate}', '${title}', '${review}', '${postDate}', '${author}', '${authorLocation}', ${listingId});`;
    }
    console.log(queryStr);
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};