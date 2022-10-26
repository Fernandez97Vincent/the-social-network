const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            // create match later using regex
            match: [/.+@.+\..+/, 'Must watch an email address']
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// get friend count

userSchema.virtual('totalFriends').get(function() {
    // return friends length
    return this.friends.length;
})

const User = model('User', userSchema);

//export ^^
module.exports = User;