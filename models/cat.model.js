const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: { type: String, required: true },
    origin: { type: String },
    temperament: { type: String },
    colors: [String],
    description: { type: String },
    image: { type: String }
});

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;
