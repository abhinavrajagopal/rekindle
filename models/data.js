var mongoose = require('mongoose');

var temp = mongoose.Schema({
    id : { type : String, required : true },
    room : { type : String, required : true, default : "100"  },
    created_at : { type : Date, required : true, default : Date.now },
    perc : { type : Number, required : true, default : 0 },
    dropCount : { type : String, required : true, default : "0" },
    botml : { type : Number, required : true, default : 0 },
    status : { type : String, required : true, default : "G" }
})

module.exports = mongoose.model('data', temp);
