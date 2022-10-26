const { Schema, Types } = require('mongoose');

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
    },
        {
            toJSON: {
                getters: true,
            },
            id: false
        }
       

    
);

module.exports = reactionSchema;