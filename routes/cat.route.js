const router = require('express').Router();
const Cat = require('../models/cat.model');

// Get all cats or search cats
router.route('/').get(async (req, res) => {
    const searchQuery = req.query.search;
    
    try {
        let cats;
        if (searchQuery) {
            // If there is a search query, filter cats by name
            cats = await Cat.find({ name: { $regex: new RegExp(searchQuery, 'i') } });
        } else {
            // If no search query provided, get all cats
            cats = await Cat.find();
        }
        res.json(cats);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add a new cat
router.route('/add').post((req, res) => {
    const { name, origin, temperament, colors, description, image } = req.body;

    const newCat = new Cat({ name, origin, temperament, colors, description, image });

    newCat.save()
        .then(() => res.json('Cat added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a cat by ID
router.route('/:id').get((req, res) => {
    Cat.findById(req.params.id)
        .then(cat => res.json(cat))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a cat by ID
router.route('/update/:id').put((req, res) => {
    Cat.findById(req.params.id)
        .then(cat => {
            cat.name = req.body.name;
            cat.origin = req.body.origin;
            cat.temperament = req.body.temperament;
            cat.colors = req.body.colors;
            cat.description = req.body.description;
            cat.image = req.body.image;

            cat.save()
                .then(() => res.json('Cat updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a cat by ID
router.route('/:id').delete((req, res) => {
    Cat.findByIdAndDelete(req.params.id)
        .then(() => res.json('Cat deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
