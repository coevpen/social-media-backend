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

    getOneThought({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThought => {
                res.json(dbThought)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThought => {
            if(!dbThought){
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThought);
        })
        .catch(err => res.json(err));
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

    // add a reaction
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbReplyAdd => {
            if(!dbReplyAdd){
                res.sendStatus(404).json({ message: "There is no thought with this id!" });
                return;
            }
            res.json(dbReplyAdd);
        })
        .catch(err => res.json(err));
    },

    // delete a reaction
    removeReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbReaction => res.json(dbReaction))
        .catch(err => res.json(err));
    }

};

module.exports = thoughtController;