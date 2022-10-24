const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

//create reactions then thoughts
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        }
    }
)