
const createListingId = (context, events, done) => {
  context.vars['listingId'] = Math.floor(Math.random() * 10000000) + 1;
  return done();
};

const createPayload = (context, events, done) => {
  let randListing = Math.floor(Math.random() * 10000000) + 1;
  context.vars['payload'] = {
    "rating": 5,
    "stayDate": "2015-09-07",
    "title": "Test",
    "review": "This is a test post",
    "postDate": "2015-09-07",
    "author": "Me",
    "authorlocation": "",
    "ownerresponse": "",
    "listingId": randListing
  };
  return done();
}

const setJSONBody = (requestParams, context, ee, next) => {

  return next();
};

const logHeaders = (requestParams, response, context, ee, next) => {
  // console.log(response.headers);
  return next();
};

module.exports = {
  setJSONBody: setJSONBody,
  logHeaders: logHeaders,
  createListingId: createListingId,
  createPayload: createPayload
};

