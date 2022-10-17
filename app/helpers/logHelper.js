module.exports = {
  writing(path) {
    console.info(`[Writing file] Path: ${path}`);
  },

  writingError(path, message) {
    console.info(`[ERROR] Path: ${path} Message: ${message}`);
  },
};
