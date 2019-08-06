const FactStore = require('./lib/factStore')

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const store = new FactStore(dbUrl);

start();

async function start() {
  let params = process.argv.slice(2);

  let command = params.shift();

  if (command === 'help' || !command) {
    help();
  }
  else if (command === 'add') {
    let text = params.join(' ').trim();
    await store.addFact(text);
  }
  else if (command === 'list') {
    await store.printAll();
  }
  else {
    help();
  }
  process.exit();

}

function help() {
  console.log(`Today I Learned

  Run locally with:

    node ./til.js

  Usage:

  til add "something cool i learned today"
    adds an entry to your TIL DB
  til list
    shows all entries, day by day
  til help
    shows this message
  `)
  process.exit(0);
}
