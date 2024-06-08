const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSchema = new Schema({
    name: { type: String, required: true },
    breed_group: { type: String },
    size: { type: String },
    lifespan: { type: String },
    origin: { type: String },
    temperament: { type: String },
    colors: [String],
    description: { type: String },
    image: { type: String }
});

const Dog = mongoose.model('Dog', dogSchema);
module.exports = Dog;
