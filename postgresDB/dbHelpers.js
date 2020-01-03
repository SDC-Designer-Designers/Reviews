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
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

//Put-reviews
module.exports.putReview = (update) => {
  let id = update.id;
  let param, queryStr;
  for (let key in update) {
    if (key !== 'id') {
      param = key;
    }
  }
  return new Promise((resolve, reject) => {
    if (param === 'rating' || param === 'listingId') {
      queryStr = `UPDATE reviews SET ${param}=${update[param]} WHERE id=${id};`;
    } else {
      queryStr = `UPDATE reviews SET ${param}='${update[param]}' WHERE id=${id};`;
    }
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

//Delete-Reviews

module.exports.deleteReview = ({id}) => {
  return new Promise((resolve, reject) => {
    let queryStr = `DELETE FROM reviews where id=${id};`;
    client.query(queryStr, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};