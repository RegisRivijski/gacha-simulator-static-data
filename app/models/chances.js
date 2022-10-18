const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model('chances', new Schema({}, { strict: false }));
