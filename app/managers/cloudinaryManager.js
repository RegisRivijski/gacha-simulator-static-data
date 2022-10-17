const config = require('config');
const axios = require('axios');

const cloudinaryOrigin = `${config.rest.images.protocol}//${config.rest.images.host}${config.rest.images.url}`;

module.exports = {
  getGachaSplash({ namegachasplash }) {
    return axios
      .get(`${cloudinaryOrigin}${namegachasplash}.png`, {
        responseType: 'arraybuffer',
      })
      .then(({ data }) => data);
  },

  getGachaSlice({ namegachaslice }) {
    return axios
      .get(`${cloudinaryOrigin}${namegachaslice}.png`, {
        responseType: 'arraybuffer',
      })
      .then(({ data }) => data);
  },

  getGacha({ namegacha }) {
    return axios
      .get(`${cloudinaryOrigin}${namegacha}.png`, {
        responseType: 'arraybuffer',
      })
      .then(({ data }) => data);
  },
};
