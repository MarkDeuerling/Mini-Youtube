/**
 * task 5.1a
 * define mongoos schema and modul export video
 * @author: Mark Deuerling, Evgenij Relin, Jörg Kandziora
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vidSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, default: ''},
    src: { type: String, required: true },
    length: { type: Number, required: true },
    playcount: {type: Number, min: 0, default: 0},
    ranking: {type: Number, min: 0, default: 0}
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Videos', vidSchema);