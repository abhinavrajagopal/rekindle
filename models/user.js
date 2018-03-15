'use strict'

const   mongoose = require('mongoose'),
        bcrypt = require('bcryptjs'),
        saltFactor = 10;

let userSchema = mongoose.Schema({
    username : { type : String, required : true, unique : true, lowercase : true, trim : true },
    role : { type : String, required : true, default : 'client', enum : [ 'admin', 'client' ]  },
    password : { type : String, required : true },
    devices : [{ type : String  }]
})

userSchema.pre('save', function(next){

    console.log("pre save")

    if(!this.isModified('password'))    return next();

    this.generatePassword(this.password)
    .then((hash)=>{
        console.log("here ?")
        this.password = hash
        next();
    })
    .catch(next);

})

userSchema.methods.verifyPassword = function(password){ return bcrypt.compare(password, this.password) };

userSchema.methods.generatePassword = (password) => bcrypt.hash(password, saltFactor);

module.exports = mongoose.model('user', userSchema);
