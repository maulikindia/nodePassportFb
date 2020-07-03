let mongoose = require('mongoose');

let user_schema = new mongoose.Schema({


    fb: {
        userName: { type: String }, //displayName from the fb - consists of whole name
        userId: { type: String },//unique id from fb
        email: { type: String },
        token: { type: String },//token that is generated from fb while doing login.
    },
    twitter:
    {
        email: { type: String },
        token: { type: String },//token that is generated from twitetr while doing login.
        userName: { type: String },
        userId: { type: String },
    }



}, { timestamps: true });


module.exports = mongoose.model('usr', user_schema);