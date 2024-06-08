const router = require('express').Router();
const Dog = require('../models/dog.model');

// Get all dogs or search dogs
router.route('/').get(async (req, res) => {
    const searchQuery = req.query.search;
    
    try {
        let dogs;
        if (searchQuery) {
            // If there is a search query, filter dogs by name
            dogs = await Dog.find({ name: { $regex: new RegExp(searchQuery, 'i') } });
        } else {
            // If no search query provided, get all dogs
            dogs = await Dog.find();
        }
        res.json(dogs);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add a new dog
router.route('/add').post((req, res) => {
    const { name, breed_group, size, lifespan, origin, temperament, colors, description, image } = req.body;

    const newDog = new Dog({ name, breed_group, size, lifespan, origin, temperament, colors, description, image });

    newDog.save()
        .then(() => res.json('Dog added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a dog by ID
router.route('/:id').get((req, res) => {
    Dog.findById(req.params.id)
        .then(dog => res.json(dog))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a dog by ID
router.route('/update/:id').put((req, res) => {
    Dog.findById(req.params.id)
        .then(dog => {
            dog.name = req.body.name;
            dog.breed_group = req.body.breed_group;
            dog.size = req.body.size;
            dog.lifespan = req.body.lifespan;
            dog.origin = req.body.origin;
            dog.temperament = req.body.temperament;
            dog.colors = req.body.colors;
            dog.description = req.body.description;
            dog.image = req.body.image;

            dog.save()
                .then(() => res.json('Dog updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a dog by ID
router.route('/:id').delete((req, res) => {
    Dog.findByIdAndDelete(req.params.id)
        .then(() => res.json('Dog deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
