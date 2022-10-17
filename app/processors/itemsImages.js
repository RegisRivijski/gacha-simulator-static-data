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
    for await (const item of characters) {
      const splashImagePath = `./staticData/assets/img/items/gachaSplashCharacters/${item.objKey}.png`;
      const sliceImagePath = `./staticData/assets/img/items/gachaSliceCharacters/${item.objKey}.png`;

      const nameGachaSplash = item?.images?.namegachasplash;
      const nameGachaSlice = item?.images?.namegachaslice;

      if (nameGachaSplash) {
        const splashImage = await cloudinaryManager.getGachaSplash(nameGachaSplash)
          .catch((e) => log.writingError(splashImagePath, e.message));

        if (splashImage) {
          log.writing(splashImagePath);
          fs.writeFileSync(splashImagePath, splashImage, { encoding: 'binary' });
        }
      }

      if (nameGachaSlice) {
        const sliceImage = await cloudinaryManager.getGachaSlice(nameGachaSlice)
          .catch((e) => log.writingError(splashImagePath, e.message));

        if (sliceImage) {
          log.writing(sliceImagePath);
          fs.writeFileSync(sliceImagePath, sliceImage, { encoding: 'binary' });
        }
      }
    }

    for await (const item of weapons) {
      const imagePath = `./staticData/assets/img/items/gachaWeapons/${item.objKey}.png`;

      const nameGacha = item?.images?.namegacha;

      if (nameGacha) {
        const image = await cloudinaryManager.getGacha()
          .catch((e) => log.writingError(imagePath, e.message));

        if (image) {
          log.writing(imagePath);
          fs.writeFileSync(imagePath, image, { encoding: 'binary' });
        }
      }
    }
  },
};
