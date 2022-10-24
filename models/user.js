const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
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
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// get friend count

UserSchema.virtual('totalFriends').get(function() {
    // return friends length
    return this.friends.length;
})

const Users = model('user', UserSchema);

//export
module.exports = user;