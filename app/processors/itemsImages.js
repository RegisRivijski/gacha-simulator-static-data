const fs = require('fs');
const genshindb = require('genshin-db');

const log = require('../helpers/logHelper');
const cloudinaryManager = require('../managers/cloudinaryManager');

const characters = genshindb.characters('names', {
  matchCategories: true,
  resultLanguage: 'en',
});

const weapons = genshindb.weapons('names', {
  matchCategories: true,
  resultLanguage: 'en',
});

module.exports = {
  async generate() {
    const charactersEn = Object.values(characters);
    const weaponsEn = Object.values(weapons);

    for await (const item of charactersEn) {
      const splashImagePath = `./staticData/assets/img/items/gachaSplashCharacters/${item.objKey}.png`;
      const sliceImagePath = `./staticData/assets/img/items/gachaSliceCharacters/${item.objKey}.png`;

      const splashImage = await cloudinaryManager.getGachaSplash(item.images)
        .catch((e) => log.writingError(splashImagePath, e.message));

      if (splashImage) {
        log.writing(splashImagePath);
        fs.writeFileSync(splashImagePath, splashImage, { encoding: 'binary' });
      }

      const sliceImage = await cloudinaryManager.getGachaSlice(item.images)
        .catch((e) => log.writingError(splashImagePath, e.message));

      if (sliceImage) {
        log.writing(sliceImagePath);
        fs.writeFileSync(sliceImagePath, sliceImage, { encoding: 'binary' });
      }
    }

    for await (const item of weaponsEn) {
      const imagePath = `./staticData/assets/img/items/gachaWeapons/${item.objKey}.png`;

      const image = await cloudinaryManager.getGacha(item.images)
        .catch((e) => log.writingError(imagePath, e.message));

      if (image) {
        log.writing(imagePath);
        fs.writeFileSync(imagePath, image, { encoding: 'binary' });
      }
    }
    console.info('Done!');
  },
};
