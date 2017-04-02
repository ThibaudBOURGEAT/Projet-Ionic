var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pariSchema = new Schema({
    teamname: Array,
    winner: String,
    score: Array,
    BO: Number,
    id: Number
});

module.exports = mongoose.model('Pari', pariSchema);