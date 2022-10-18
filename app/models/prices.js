const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model('prices', new Schema({}, { strict: false }));
