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

    deleteThought(){

    },

};

module.exports = thoughtController;