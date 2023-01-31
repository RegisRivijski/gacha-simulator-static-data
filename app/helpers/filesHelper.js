const fs = require('fs');
const log = require('./logHelper');

module.exports = {
  writeImage(path, img) {
    log.writing(path);
    fs.writeFileSync(path, img, { encoding: 'binary' });
  },
};
