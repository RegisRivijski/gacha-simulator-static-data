const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model('translates', new Schema({}, { strict: false }));
