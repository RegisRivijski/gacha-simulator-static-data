const itemsData = require('./processors/itemsData');
const imagesData = require('./processors/itemsImages');
const finalGachaImages = require('./processors/finalGachaImages');

await itemsData.generate();
await imagesData.generate();
await finalGachaImages.generate();

console.info('Done!');
