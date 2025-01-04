const fs = require('fs');

const text2png = require('text2png');
const imageSize = require('image-size');
const sharp = require('sharp');
const genshindb = require('genshin-db');

const log = require('../helpers/logHelper');

const {
  BLOCKED_CHARACTERS_OBJ_KEYS,
  BLOCKED_WEAPONS_OBJ_KEYS,
} = require('../constants/index');

const characters = genshindb.characters('names', {
  matchCategories: true,
  resultLanguage: 'en',
});

const weapons = genshindb.weapons('names', {
  matchCategories: true,
  resultLanguage: 'en',
});

module.exports = {
  async renderCharacters(path, font, langCode) {
    for await (const name of characters) {
      const character = genshindb.characters(name, {
        matchCategories: true,
        resultLanguage: langCode,
      });

      const characterEng = genshindb.characters(name, {
        matchCategories: true,
        resultLanguage: 'en',
      });

      if (BLOCKED_CHARACTERS_OBJ_KEYS.indexOf(characterEng.name) !== -1) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const renderedImagePath = `./staticData/assets/img/${path}/${name}.png`;

      if (fs.existsSync(renderedImagePath)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const text = text2png(character.name.length > 10 ? character.name.replace(' ', '\n') : character.name, {
        font: '75px TrueType',
        color: 'white',
        textAlign: 'left',
        localFontPath: `./staticData/assets/fonts/${font}`,
        localFontName: 'TrueType',
      });

      const textLeft = 100;

      const genshinGachaChatText = text2png('Genshin Gacha Simulator', {
        font: '40px TrueType',
        color: '#777777',
        localFontPath: './staticData/assets/fonts/zh-cn.ttf',
        localFontName: 'TrueType',
      });

      let elementIconPath;
      switch (characterEng.elementText) {
        case 'Anemo':
          elementIconPath = 'Element_Anemo.png';
          break;
        case 'Pyro':
          elementIconPath = 'Element_Pyro.png';
          break;
        case 'Geo':
          elementIconPath = 'Element_Geo.png';
          break;
        case 'Cryo':
          elementIconPath = 'Element_Cryo.png';
          break;
        case 'Electro':
          elementIconPath = 'Element_Electro.png';
          break;
        case 'Hydro':
          elementIconPath = 'Element_Hydro.png';
          break;
        case 'Dendro':
          elementIconPath = 'Element_Dendro.png';
          break;
        default:
          break;
      }

      const resizedSplash = await sharp(`./staticData/assets/img/items/gachaSplashCharacters/${characterEng.name}.png`)
        .resize(1920, 1080)
        .toBuffer();

      const resizedRarityStar = await sharp('./staticData/assets/img/rarityStar.png')
        .resize(80, 80)
        .toBuffer();

      const rarityStars = [];
      const rarityStarsLeft = 90;

      const iconElement = await sharp(`./staticData/assets/img/elements/${elementIconPath}`)
        .resize(128, 128)
        .toBuffer();

      for (let i = 0; i < Number(character.rarity); i += 1) {
        rarityStars.push({
          input: resizedRarityStar,
          top: character.name.length > 10 ? 660 : 570,
          left: rarityStarsLeft + 80 * i,
        });
      }

      await sharp('./staticData/assets/img/blankGachaSplash.jpg')
        .resize(1920, 1080)
        .composite([
          {
            input: resizedSplash,
          },
          ...rarityStars,
          {
            input: iconElement,
            top: 440,
            left: textLeft - 90,
          },
          {
            input: text,
            top: 500,
            left: textLeft,
          },
          {
            input: genshinGachaChatText,
            top: 10,
            left: 10,
          },
        ])
        .normalize()
        .toFile(renderedImagePath);
      log.writing(renderedImagePath);
    }
  },

  async renderWeapons(path, font, langCode) {
    for await (const name of weapons) {
      const weapon = genshindb.weapons(name, {
        matchCategories: true,
        resultLanguage: langCode,
      });

      const weaponEng = genshindb.weapons(name, {
        matchCategories: true,
        resultLanguage: 'en',
      });

      if (BLOCKED_WEAPONS_OBJ_KEYS.indexOf(weaponEng.name) !== -1) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const renderedImagePath = `./staticData/assets/img/${path}/${name}.png`;

      if (fs.existsSync(renderedImagePath)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const text = text2png(weapon.name, {
        font: '75px TrueType',
        color: 'white',
        textAlign: 'center',
        localFontPath: `./staticData/assets/fonts/${font}`,
        localFontName: 'TrueType',
      });

      const genshinGachaChatText = text2png('Genshin Gacha Simulator', {
        font: '40px TrueType',
        color: '#777777',
        localFontPath: './staticData/assets/fonts/zh-cn.ttf',
        localFontName: 'TrueType',
      });

      let bgClassPath;
      let iconClassPath;
      switch (weaponEng.weaponText) {
        case 'Claymore':
          bgClassPath = 'bg-claymore.png';
          iconClassPath = 'Icon_Claymore.png';
          break;
        case 'Bow':
          bgClassPath = 'bg-bow.png';
          iconClassPath = 'Icon_Bow.png';
          break;
        case 'Sword':
          bgClassPath = 'bg-sword.png';
          iconClassPath = 'Icon_Sword.png';
          break;
        case 'Polearm':
          bgClassPath = 'bg-polearm.png';
          iconClassPath = 'Icon_Polearm.png';
          break;
        case 'Catalyst':
          bgClassPath = 'bg-catalyst.png';
          iconClassPath = 'Icon_Catalyst.png';
          break;
        default:
      }

      const bgClass = await sharp(`./staticData/assets/img/items/gachaBgWeapons/${bgClassPath}`)
        .toBuffer();

      const iconClass = await sharp(`./staticData/assets/img/items/gachaClassWeapons/${iconClassPath}`)
        .resize(128, 128)
        .toBuffer();

      const resizedSplash = await sharp(`./staticData/assets/img/items/gachaWeapons/${weaponEng.name}.png`)
        .toBuffer();

      const resizedRarityStar = await sharp('./staticData/assets/img/rarityStar.png')
        .resize(80, 80)
        .toBuffer();

      const rarityStars = [];

      const textLeft = 960 - Math.floor(imageSize(text).width / 2);
      const rarityStarsLeft = 960 - Number(weapon.rarity) * 40;

      for (let i = 0; i < Number(weapon.rarity); i += 1) {
        rarityStars.push({
          input: resizedRarityStar,
          top: 890,
          left: rarityStarsLeft + 80 * i,
        });
      }

      await sharp('./staticData/assets/img/blankGachaSplash.jpg')
        .resize(1920, 1024)
        .composite([
          {
            input: bgClass,
          },
          {
            input: iconClass,
            top: 760,
            left: textLeft - 128,
          },
          {
            input: resizedSplash,
          },
          ...rarityStars,
          {
            input: text,
            top: 800,
            left: textLeft,
          },
          {
            input: genshinGachaChatText,
            top: 10,
            left: 10,
          },
        ])
        .normalize()
        .toFile(renderedImagePath);

      log.writing(renderedImagePath);
    }
  },
};
