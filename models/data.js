var mongoose = require('mongoose');

var temp = mongoose.Schema({
    id : { type : String, required : true },
    room : { type : String  },
    created_at : { type : Date, required : true, default : Date.now },
    value1 : { type : String, required : true, default : "0" },
    value2 : { type : String, required : true, default : "0" },
    value3 : { type : String, required : true, default : "0" },
})

module.exports = mongoose.model('data', temp);
