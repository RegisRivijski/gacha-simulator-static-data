const util = require('util');

const itemsData = require('./processors/itemsData');
const imagesData = require('./processors/itemsImages');
const finalGachaImages = require('./processors/finalGachaImages');

const consoleInfoPromise = util.promisify(console.info);

async function main() {
  await itemsData.generate();
  await imagesData.generate();
  await finalGachaImages.generate();

  await consoleInfoPromise('Done!');
}

main();
