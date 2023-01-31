const databaseData = require('./databaseData');
const itemsData = require('./itemsData');
const imagesData = require('./itemsImages');
const finalGachaImages = require('./finalGachaImages');

module.exports = {
  async generate() {
    await databaseData.generate();
    console.info('databaseData generated!');
    await itemsData.generate();
    console.info('itemsData generated!');
    await imagesData.generate();
    console.info('imagesData generated!');
    await finalGachaImages.generate();
    console.info('finalGachaImages generated!');
    console.info('Done!');
  },
};
