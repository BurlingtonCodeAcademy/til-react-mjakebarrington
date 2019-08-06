/*
Today I Learned webapp
*/
const assert = require('assert');
const FactStore = require('./lib/factStore')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static('build'))
app.use(express.urlencoded({extended: true}))

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const store = new FactStore(dbUrl);

app.get('/facts/:objectId', getOne)

async function getOne(request, response) {
  console.log('getting one...', request.params.objectId);

  let id = request.params.objectId;

  let fact = await store.get(id);
  let output = [];
  fact.forEach((entry) => {
    console.log({entry})
    output.push(entry);
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + output.length + " records to client");
    response.type('application/json')
      .send(JSON.stringify(output[0]))
  });
}

app.get('/facts', getAll);

async function getAll(request, response) {
  let cursor = await store.all();
  let output = [];
  cursor.forEach((entry) => {
    output.push(entry);
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + output.length + " records to client");
    response.type('application/json')
      .send(JSON.stringify(output))
  });
}

app.post('/facts', addFact);

async function addFact(request, response) {
  let result = await store.addFact(request.body.text.trim())
  let output = {
    status: 'ok',
    id: result.id
  }
  response
    .type('application/json')
    .send(JSON.stringify(output))
}

app.listen(port, () => console.log(`TIL web app listening on port ${port}!`))