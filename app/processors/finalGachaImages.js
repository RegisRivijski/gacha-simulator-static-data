const config = require('config');

const log = require('../helpers/logHelper');
const renders = require('../renders/finalGachaImages');

const LangCodes = config.language;

module.exports = {
  async generate() {
    // eslint-disable-next-line guard-for-in
    for await (const code of Object.keys(LangCodes)) {
      const charactersPath = `items/${code}/characters`;
      const weaponsPath = `items/${code}/weapons`;
      if (LangCodes[code].makeImg) {
        await renders.renderCharacters(charactersPath, LangCodes[code].font, code)
          .catch((e) => log.writingError(charactersPath, e.message));
        await renders.renderWeapons(weaponsPath, LangCodes[code].font, code)
          .catch((e) => log.writingError(weaponsPath, e.message));
      }
    }
  },
};
