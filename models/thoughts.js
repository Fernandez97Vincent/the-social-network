const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

//create reactions then thoughts
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // string, required, 280 length max
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        // string required
        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            // create a format of month, day and year plus hour and minutes using moment.js
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        
        toJSON: {
            getters: true
        }

    }
);

const thoughtSchema = new Schema(
    {
        // thought text, required, max280, min 1
        thought: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            // create a format of month, day and year plus hour and minutes using moment.js
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        },

        username: {
            type: String,
            required: true
        },

        reactions: {
            reactions: [reactionSchema]
        },

        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

thoughtSchema.virtual('totalReaction').get(function() {
    // count total reactions
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtSchema);

// export
module.exports = Thoughts;