var mongoose = require('mongoose');

var temp = mongoose.Schema({
    room : { type : String, required : true, default : "100" },
    val1 : { type : String, required : true, default : "0" },
    val2 : { type : String, required : true, default : "0" },
    val3 : { type : String, required : true, default : "0" },
},{
    timestamps : true
})

module.exports = mongoose.model('data', temp)