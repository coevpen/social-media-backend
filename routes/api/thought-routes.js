const router = require('express').Router();

const {
    getAllthoughts,
    createThought,
    getOneThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllthoughts);

// /api/thoughts/<userId>
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/<userId>/thoughtId
router
    .route('/:userId/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<thoughtId>/reaction

module.exports = router;