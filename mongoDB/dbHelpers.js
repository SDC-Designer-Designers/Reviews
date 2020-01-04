const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

//Get-reviews
module.exports.getReviews = (listingId) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) { reject (err); }
      let dbo = db.db('reviewsZip');
      dbo.collection('reviews').find({listingId: parseInt(listingId)}).toArray((err, result) => {
        if (err) { reject (err); }
        resolve(result);
      });
    });
  });
};

//Get-zipcodes
module.exports.getZipcode = (listingid) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) { reject (err); }
      let dbo = db.db('reviewsZip');
      dbo.collection('zipcode').find({listingid: parseInt(listingid)}).toArray((err, result) => {
        if (err) { reject (err); }
        resolve(result);
      });
    });
  });
};

//Post-Reviews

module.exports.postReview = ({rating, stayDate, title, review, postDate, author, authorLocation, ownerResponse, listingId}) => {
  let formatReview = {
    rating: parseInt(rating),
    stayDate,
    title,
    review,
    postDate,
    author,
    authorLocation,
    ownerResponse,
    listingId: parseInt(listingId)
  };
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) { reject (err); }
      let dbo = db.db('reviewsZip');
      dbo.collection('reviews').insertOne(formatReview, (err, res)=> {
        if (err) { reject (err); }
        resolve(res);
        console.log('document inserted');
      });
    });
  });
};