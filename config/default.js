const genshindb = require('genshin-db');
const packageJson = require('../package.json');

module.exports = {
  application: {
    name: packageJson.name,
    version: packageJson.version,
  },
  sentry: {
    dsn: process.env.SENTRY_GENSHIN_GACHA_SIMULATOR_BOT_DSN,
  },
  rest: {
    genshin: {
      protocol: process.env.GENSHIN_DEV_PROTOCOL,
      host: process.env.GENSHIN_DEV_HOST,
    },
    images: {
      protocol: process.env.GENSHIN_IMAGES_PROTOCOL,
      host: process.env.API_AMBR_HOST,
      url: process.env.API_AMBR_GENSHIN_IMAGES_URL,
    },
  },
  db: {
    mongodb: {
      url: process.env.MONGODB_1_HOSTNAME,
      options: {
        dbName: 'genshinImpactStaticData',
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        authSource: 'admin',
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      },
    },
  },
  language: {
    en: {
      lang: genshindb.Languages.English,
      font: 'zh-cn.ttf',
      makeImg: true,
    },
    ru: {
      lang: genshindb.Languages.Russian,
      font: 'zh-cn.ttf',
      makeImg: true,
    },
    ko: {
      lang: genshindb.Languages.Korean,
      font: 'ja-jp.ttf',
      makeImg: true,
    },
    'zh-hans': {
      lang: genshindb.Languages.ChineseSimplified,
      font: 'ja-jp.ttf',
      makeImg: true,
    },
    id: {
      lang: genshindb.Languages.Indonesian,
      font: 'zh-cn.ttf',
      makeImg: false,
    },
  },
};
