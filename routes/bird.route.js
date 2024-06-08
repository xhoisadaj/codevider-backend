const express = require('express');
const router = express.Router();
const Bird = require('../models/bird.model');

// Get all birds or search birds
router.route('/').get(async (req, res) => {
    const searchQuery = req.query.search;
    
    try {
        let birds;
        if (searchQuery) {
            // If there is a search query, filter birds by name
            birds = await Bird.find({ name: { $regex: new RegExp(searchQuery, 'i') } });
        } else {
            // If no search query provided, get all birds
            birds = await Bird.find();
        }
        res.json(birds);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});


// Add a new bird
router.post('/add', (req, res) => {
    const { name, species, family, habitat, place_of_found, diet, description, wingspan_cm, weight_kg, image } = req.body;

    const newBird = new Bird({ name, species, family, habitat, place_of_found, diet, description, wingspan_cm, weight_kg, image });

    newBird.save()
        .then(() => res.json('Bird added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get a bird by ID
router.route('/:id').get((req, res) => {
    Bird.findById(req.params.id)
        .then(bird => res.json(bird))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a bird by ID
router.route('/update/:id').put((req, res) => {
    Bird.findById(req.params.id)
        .then(bird => {
            bird.name = req.body.name;
            bird.species = req.body.species;
            bird.family = req.body.family;
            bird.habitat = req.body.habitat;
            bird.place_of_found = req.body.place_of_found;
            bird.diet = req.body.diet;
            bird.description = req.body.description;
            bird.wingspan_cm = req.body.wingspan_cm;
            bird.weight_kg = req.body.weight_kg;
            bird.image = req.body.image;

            bird.save()
                .then(() => res.json('Bird updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a bird by ID
router.route('/:id').delete((req, res) => {
    Bird.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bird deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
