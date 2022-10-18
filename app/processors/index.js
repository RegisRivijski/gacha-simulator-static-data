const databaseData = require('./databaseData');
const itemsData = require('./itemsData');
const imagesData = require('./itemsImages');
const finalGachaImages = require('./finalGachaImages');

module.exports = {
  async generate() {
    await databaseData.generate();
    await itemsData.generate();
    await imagesData.generate();
    await finalGachaImages.generate();

    console.info('Done!');
  },
};
