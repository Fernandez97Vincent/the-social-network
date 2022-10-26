const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: 'You need to enter a thought',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Moment
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    // Use ReactionsSchema to validate data
    reactions: [reactionSchema]
    },
    {
    toJSON: {
        getters: true
    },
    id: false
    }
)

thoughtSchema.virtual('totalReaction').get(function() {
    // count total reactions
    return this.reactions.length;
});

const Thought = model('Thoughts', thoughtSchema);

// export
module.exports = Thought;