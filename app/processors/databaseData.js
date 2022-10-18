const fs = require('fs');
const util = require('util');

const log = require('../helpers/logHelper');

const fsWriteFile = util.promisify(fs.writeFile);

const BannersModel = require('../models/banners');
const ChancesModel = require('../models/chances');
const PricesModel = require('../models/prices');

module.exports = {
  async generate() {
    const bannersPath = './staticData/data/banners/banners.json';
    const chancesPathToFile = './staticData/data/chances/';
    const pricesPathToFile = './staticData/data/prices/';

    const bannersData = await BannersModel.find({});
    const chancesData = await ChancesModel.find({});
    const pricesData = await PricesModel.find({});

    const banners = {};
    for (const item of bannersData) {
      banners[item.objKey] = item;
    }

    log.writing(bannersPath);
    await fsWriteFile(bannersPath, JSON.stringify(banners));

    for await (const item of chancesData) {
      if (item.filename && item.data) {
        const chancesPath = `${chancesPathToFile}${item.filename}`;

        log.writing(chancesPath);
        await fsWriteFile(chancesPath, JSON.stringify(item.data));
      }
    }

    for await (const item of pricesData) {
      if (item.filename && item.data) {
        const pricesPath = `${pricesPathToFile}${item.filename}`;

        log.writing(pricesPath);
        await fsWriteFile(pricesPath, JSON.stringify(item.data));
      }
    }
  },
};
