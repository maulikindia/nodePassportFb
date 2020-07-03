let mongoose = require('mongoose');

let user_schema = new mongoose.Schema({

    fbName: { type: String }, //displayName from the fb - consists of whole name
    fbId: { type: String },//unique id from fb
    email: { type: String },
    token: { type: String }//token that is generated from fb while doing login.


}, { timestamps: true });


module.exports = mongoose.model('usr', user_schema);