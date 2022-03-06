const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;