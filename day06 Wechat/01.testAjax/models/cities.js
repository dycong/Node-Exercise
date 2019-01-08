const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citiesSchema = new Schema({
    code: String,
    province: String,
    city: String,
    county: String,
    name: String,
    level: Number
});

module.exports = mongoose.model('cities', citiesSchema);