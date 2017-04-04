var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    id_steam: String,
    admin: Boolean,
    del: Boolean
});

module.exports = mongoose.model('User', userSchema);
