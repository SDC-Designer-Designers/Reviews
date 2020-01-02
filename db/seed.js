const Reviews = require('./data').Reviews;
const Zips = require('./data').Zips;
const faker = require('faker');
var moment = require('moment');
var zipcodes = require('zipcodes');


genReview = async () => {
  let revObj, randOwn, randLoc, listReviews, date;
  let ownerProb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let locationProb = [1, 2, 3];
  //total reviews
  for (let j = 0; j < 101; j++) {
    let randRev = Math.floor(Math.random() * 25);
    listReviews = [];
  //random number of reviews per property
    for (let i = 0; i < randRev; i++) {
      randOwn = Math.floor(Math.random() * 11);
      randLoc = Math.floor(Math.random() * 4);
      date = faker.date.between('2005-2-1', '2019-12-7');
      revObj = {};
      revObj.rating = Math.floor(Math.random() * 5) + 1;
      revObj.dateS = date;
      revObj.title = faker.lorem.sentence();
      revObj.review = faker.lorem.paragraph();
      if(locationProb[randLoc] === 2){
        revObj.dateP = moment(date).add(1, 'M');
      } else {
        revObj.dateP = date;
      }
      revObj.author = faker.name.findName();
      if (ownerProb[randOwn] === 4) {
        revObj.ownerR = faker.lorem.paragraph();
      }
      if (locationProb[randLoc] === 2) {
        revObj.aLocation = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
      }
      revObj.ListingId = j;
      listReviews.push(revObj);
    }
    await Reviews.sync({ force: false })
      .then(() => {
        Reviews.bulkCreate(listReviews, { validate: true });
        console.log(listReviews)
      }).then(() => {
        console.log('review data created');
      }).catch((e) => {
        console.error('seeding function failed: ' + e);
      });
    }

};

genLocations = () => {
  let zipCodeObj;
  let zipArray =[];

  for (let i =0; i < 101; i++){
    zipCodeObj = {}
    let randZip = zipcodes.random();
    zipCodeObj.zipCode = randZip.zip
    zipCodeObj.ListingId = i
    zipArray.push(zipCodeObj)
  }
  Zips.sync({ force: true})
  .then(() => {
    Zips.bulkCreate(zipArray, { validate: true });
  }).then(() => {
    console.log('Zipcodes created')
  }).catch((e) => {
    console.error('Error: ' + e)
  })
}

genReview();
genLocations();