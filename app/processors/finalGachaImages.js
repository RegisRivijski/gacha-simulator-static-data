const config = require('config');

const renders = require('../renders/finalGachaImages');

const LangCodes = config.language;

module.exports = {
  async generate() {
    // eslint-disable-next-line guard-for-in
    for await (const code of Object.keys(LangCodes)) {
      if (LangCodes[code].makeImg) {
        await renders.renderCharacters(`items/${code}/characters`, LangCodes[code].font);
        await renders.renderWeapons(`items/${code}/weapons`, LangCodes[code].font);
      }
    }
  },
};
