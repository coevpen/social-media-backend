const { User } = require('../models');

const userController = {

    //gets all users
    getAllUsers(req, res){
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsers => {
                res.json(dbUsers);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //creates a user
    createUser({ body }, res){
        User.create(body)
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },

    //get user by id
    getOneUser({ params }, res){
        User.findOne( { _id: params.id } )
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // update user by id
    updateUser({ params, body }, res){
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUser => {
            if(!dbUser){
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
    },

    // delete user by id
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },

    //add a friend to friends list
    addFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbFriend => {
            if(!dbFriend){
                res.sendStatus(404).json({ message: "There is no user with this id!" });
                return;
            }
            res.json(dbFriend);
        })
        .catch(err => res.json(err));
    },

    // remove a friend from friends list
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbFriend => res.json(dbFriend))
        .catch(err => res.json(err));
    }
};

module.exports = userController;