const config = require('config');
const fs = require('fs');
const genshindb = require('genshin-db');
const util = require('util');

const log = require('../helpers/logHelper');

const fsWriteFile = util.promisify(fs.writeFile);

const LangCodes = config.language;

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
    const charactersData = {};
    const weaponsData = {};
    // eslint-disable-next-line guard-for-in
    for await (const code of Object.keys(LangCodes)) {
      const charactersPath = `./staticData/data/items/${code}/characters.json`;
      const weaponsPath = `./staticData/data/items/${code}/weapons.json`;

      if (!charactersData[code]) {
        charactersData[code] = {};
      }
      if (!weaponsData[code]) {
        weaponsData[code] = {};
      }

      for (const name of characters) {
        const engCharacter = genshindb.characters(name, {
          matchCategories: true,
          resultLanguage: 'en',
        });

        charactersData[code][name] = {
          objKey: name,
          elementKey: engCharacter.element,
          ...genshindb.characters(name, {
            matchCategories: true,
            resultLanguage: LangCodes[code].lang,
          }),
        };
      }

      log.writing(charactersPath);
      await fsWriteFile(charactersPath, JSON.stringify(charactersData[code], null, 2));

      for (const name of weapons) {
        const engWeapon = genshindb.weapons(name, {
          matchCategories: true,
          resultLanguage: 'en',
        });

        weaponsData[code][name] = {
          objKey: name,
          weapontypeKey: engWeapon.weapontype,
          ...genshindb.weapons(name, {
            matchCategories: true,
            resultLanguage: LangCodes[code].lang,
          }),
        };
      }

      log.writing(weaponsPath);
      await fsWriteFile(weaponsPath, JSON.stringify(weaponsData[code], null, 2));
    }
  },
};
