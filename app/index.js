const mongoose = require('./modules/mongoose');
const indexProcessor = require('./processors/index');

async function main() {
  await mongoose.connect();
  await indexProcessor.generate();
  process.exit();
}

main();
