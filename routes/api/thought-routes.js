const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async(req, res) => {
    try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 })
        res.status(200).json(dbThoughtData);
    } catch(err) {
        res.status(404).json(err)
    }
    
})

router.post('/', async(req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate({
            _id: req.body.userId,
        },
        { $push: { thoughts: dbThoughtData._id} },
        {new: true}
        );
        if(!dbUserData) {
            return res.status(404).json({
                message: `Thought created but there is no user with the id`
            })
        }
        res.status(200).json({ ...dbThoughtData, message: `Thought successfully created`});
    } catch(err) {
        res.status(404).json(err)
    }
    
})

router.get('/:thoughtId', async(req, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        if(!dbThoughtData) {
            return res.status(404).json({ message: `No thought given the ID`})
        }
        res.status(200).json(dbThoughtData)
    } catch(err) {
        res.status(500).json(err);
    }

})

router.put('/:thoughtId', async(req, res) => {
     try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            { $set: req.body },
            {runValidators: true, new: true}
        );
        if(!dbThoughtData) {
            return res.status(404).json({message: 'No thought given the ID'})
        }
        res.json(dbThoughtData)
    } catch(err) {
        
    }
})

router.delete('/:thoughtId', async(req, res) => {
    try {
        const dbThoughtData = Thought.findOneAndRemove({ _id: req.params.thoughtId })
        if(!dbThoughtData) {
            return res.status(404).json({message: 'No thought given the ID'})
        }
        const dbUserData = await User.findOneAndUpdate(
            {
                thoughts: req.params.thoughtId,
            },
            { $pull: { thoughts: req.params.thoughtId } },
            {new: true}
        );
        if(!dbUserData) {
            return res.status(404).json({ message: 'Thought was created but no user with the given ID'})
        }
        res.json({ message: 'Thought successfully deleted!'})
    } catch(err) {
        
    }
})

router.post('/:thoughtId/reactions', async(req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate({
            _id: req.params.thoughtId,
        },
        {$addToSet: { reactions: req.body }},
        {runValidators: true, new: true}
        );
        if(!dbThoughtData) {
            return res.status(404).json({ message: 'No thought given the ID'})
        }
        res.status(200).json(dbThoughtData);
    } catch(err) {
        res.status(500).json(err)
        
    }
})

router.delete('/:thoughtId/reactions/:reaction', async(req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId,
        },
        {$pull: { reactions: { reactionId: req.params.reactionId } } },
        {runValidators: true, new: true}
        );
        if(!dbThoughtData) {
            return res.status(404).json( { message: 'No thought given the ID'})
        }
        res.status(200).json(dbThoughtData)
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;