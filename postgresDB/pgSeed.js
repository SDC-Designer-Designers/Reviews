const faker = require('faker');
const moment = require('moment');
const zipcodes = require('zipcodes');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csv = require('csv-parser');

//Iteration count remembered via closure in genReview
let j = 1;

//creates write stream, CHANGE LOCATION FOR EACH CSV
const stream = fs.createWriteStream('../seed/reviewSeed.csv');

  stream.on('error', (err) => {
    console.error(err);
  });

  stream.on('close', (err) => {
    console.log('---->seed completed!<----');
  });


  //creates 50M reviews
  genReview = async () => {
  let revObj, randOwn, randLoc, listReviews, date;
  let ownerProb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let locationProb = [1, 2, 3];
  //turns false when node needs to drain
  let ok = true;


  for (j; j <= 20000001; j++) {
    if (ok) {
      listReview = [];
      randOwn = Math.floor(Math.random() * 11);
      randLoc = Math.floor(Math.random() * 4);
      date = faker.date.between('2005-2-1', '2019-12-7');
      revObj = {};
      revObj.ListingId = Math.floor(Math.random() * 10000000) + 1;
      revObj.rating = Math.floor(Math.random() * 5) + 1;
      revObj.dateS = JSON.stringify(date);
      revObj.title = faker.lorem.sentence();
      revObj.review = faker.lorem.paragraph();
      if(locationProb[randLoc] === 2){
        revObj.dateP = JSON.stringify(moment(date).add(1, 'M'));
      } else {
        revObj.dateP = JSON.stringify(date);
      }
      revObj.author = faker.name.findName();
      if (ownerProb[randOwn] === 4) {
        revObj.ownerR = faker.lorem.paragraph();
      }
      if (locationProb[randLoc] === 2) {
        revObj.aLocation = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
      }
      listReview.push(revObj);

      if (j % 1000000 === 0 && j !== 0) {
        console.log(`---> Seed ${(j/50000001) * 100}% Complete<----`);
      }

        const csvStringifier = createCsvStringifier({
          header: [
            {id: 'rating', title: 'rating'},
            {id: 'dateS', title: 'stayDate'},
            {id: 'title', title: 'title'},
            {id: 'review', title: 'review'},
            {id: 'dateP', title: 'postDate'},
            {id: 'author', title: 'author'},
            {id: 'aLocation', title: 'authorLocation'},
            {id: 'ownerR', title: 'ownerResponse'},
            {id: 'ListingId', title: 'listingId'}
          ],
          append: true,
          fieldDelimiter: ','
        });
      ok = stream.write(csvStringifier.stringifyRecords(listReview));
    } else {
      break;
    }
  }
  //sets up event listener once node needs to drain, invokes function once drain is complete
  if (!ok) {
    stream.once('drain', () => {
      genReview();
    })
  }
};

// invokes CSV generating function
genReview()
.catch((err) => {
  console.error(err);
})

//reads the free zipcode database and creates a cache
const getZipcodes = () => {
  let zipData = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('/Users/fook/Desktop/HRLA33/SDC/Reviews/postgresDB/free-zipcode-database.csv')
    .pipe(csv())
    .on('data', function(data){
        try {
            //perform the operation
            zipData.push(data.Zipcode)
        }
        catch(err) {
            //error handler
            reject(err)
        }
    })
    .on('end',function(){
        //resolves withthe zipcode data
        resolve(zipData)
    });
  })
}
//zipcode cache variable
let zipCache;

//Iteration count remembered via closure in genLocations
let i = 1;

// creates batch of 10M zipcodes
genLocations = async (zipCache) => {
  const csvStringifier = createCsvStringifier({
      header: [
          {id: 'zipCode', title: 'zipcode'},
          {id: 'ListingId', title: 'listingId'}
      ],
    append: true,
    fieldDelimiter: ','
  });
  let ok = true;

  for (i; i <= 10000001; i++){
    if (ok) {
      let zipArray = [];
      let zipCodeObj = {};
      let randIdx = Math.floor(Math.random() * zipCache.length);
      zipCodeObj.zipCode = zipCache[randIdx];
      zipCodeObj.ListingId = i;
      zipArray.push(zipCodeObj)
      ok = stream.write(csvStringifier.stringifyRecords(zipArray))
      if (i % 1000000 === 0 && i !== 0) {
        console.log(`---> Seed ${(i/10000000) * 100}% Complete<----`);
      }
    } else {
      break;
    }
  }
  //sets up event listener once node needs to drain, invokes function once drain is complete
  if (!ok) {
    stream.once('drain', () => {
      genLocations(zipCache);
    })
  }
}

// creates zipcode cache, invokes CSV generating function
// getZipcodes()
// .then((data) => {
//   console.log('Zipcodes Cached!');
//   zipCache = data;
//   genLocations(zipCache)
// })
// .catch((err) => {
//   console.error(err);
// });
