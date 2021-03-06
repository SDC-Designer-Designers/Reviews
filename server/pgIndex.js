const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbHelpers = require('../postgresDB/dbHelpers.js');
const path = require('path');


const app = express();
const port = process.env.PORT || 3005;

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

//Get-reviews
app.get('/reviews/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const data = await dbHelpers.getReviews(id);

    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(e)
  }
});

//Get-zipcodes
app.get('/zips/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const data = await dbHelpers.getZipcode(id);

    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(e)
  }
});

//Post-reviews
app.post('/reviews', async (req, res) => {
  try {
    const data = await dbHelpers.postReview(req.body);

    res.status(200).send(data)
  } catch (e) {
    console.log(e);
    res.status(500).send(e)
  }
});

//Put-reviews
app.put('/reviews', async (req, res) => {
  try {
    const data = await dbHelpers.putReview(req.body);

    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(e)
  }
});

//Delete-reviews
app.delete('/reviews', async (req, res) => {
  try {
    const data = await dbHelpers.deleteReview(req.body);

    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(e)
  }
});


app.listen(port, () => {
  console.log(`Server listening on port -> ${port} <-`);
});