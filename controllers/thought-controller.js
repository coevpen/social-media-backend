const { Thought, User } = require('../models');

const thoughtController = {
    getAllthoughts(req, res){
        Thought.find()
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ params, body }, res){
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughts => {
                if(!dbThoughts){
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    },

    getOneThought(){

    },

    updateThought(){

    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought){
                    return res.status(404).json({ message: "No thought found with this id!" });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

};

module.exports = thoughtController;