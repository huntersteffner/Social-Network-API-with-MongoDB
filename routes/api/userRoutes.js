const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

router 
    .route('/users')
    .get(getAllUsers)
    .post(createUser)


router
    .route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
router
    .route('/users/:id/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend)