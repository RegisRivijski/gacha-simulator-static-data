const fs = require('fs');
const util = require('util');

const log = require('../helpers/logHelper');

const fsWriteFile = util.promisify(fs.writeFile);

const BannersModel = require('../models/banners');
const ChancesModel = require('../models/chances');
const PricesModel = require('../models/prices');
const TranslatesModel = require('../models/translates');

module.exports = {
  async generate() {
    const bannersPath = './staticData/data/banners/banners.json';

    const chancesPathToFile = './staticData/data/chances/';
    const pricesPathToFile = './staticData/data/prices/';
    const translatesPathToFile = './staticData/translates/';

    const bannersData = await BannersModel.find({});
    const chancesData = await ChancesModel.find({});
    const pricesData = await PricesModel.find({});
    const translatesData = await TranslatesModel.find({});

    const banners = {};
    for (const item of bannersData) {
      banners[item.objKey] = item;
    }

    log.writing(bannersPath);
    await fsWriteFile(bannersPath, JSON.stringify(banners));

    for await (const item of chancesData) {
      if (item.filename && item.data) {
        const chancesPath = `${chancesPathToFile}${item.filename}.json`;

        log.writing(chancesPath);
        await fsWriteFile(chancesPath, JSON.stringify(item.data));
      }
    }

    for await (const item of pricesData) {
      if (item.filename && item.data) {
        const pricesPath = `${pricesPathToFile}${item.filename}.json`;

        log.writing(pricesPath);
        await fsWriteFile(pricesPath, JSON.stringify(item.data));
      }
    }

    for await (const item of translatesData) {
      if (item.filename && item.data) {
        const translatesPath = `${translatesPathToFile}${item.code}.json`;

        log.writing(translatesPath);
        await fsWriteFile(translatesPath, JSON.stringify(item));
      }
    }
  },
};
