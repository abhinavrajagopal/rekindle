var mongoose = require('mongoose');

var temp = mongoose.Schema({
    room : { type : String, required : true, default : "100" },
    value1 : { type : String, required : true, default : "0" },
    value2 : { type : String, required : true, default : "0" },
    value3 : { type : String, required : true, default : "0" },
},{
    timestamps : true
})

module.exports = mongoose.model('data', temp)