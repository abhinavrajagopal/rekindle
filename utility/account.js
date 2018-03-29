const   userModel = require('../models/user');

/*
    Utility to allow admins to create user accounts.
*/
const createAccount = function(data){

    return new userModel(data).save()
            .catch((err)=>{
                console.log("Error createAccount - ", err);
                return Promise.reject(err);
            })
}
/*
    Utility to fetch all client accounts
*/
const getAccounts = function(){
    return userModel.find({ "role" : "client" }, { "username" : 1, "devices" : 1, "_id" : 0 })
    .catch((err)=>{
        console.log("Error getAccounts - ", err);
        Promise.reject(err);
    })
}

module.exports = {
    createAccount : createAccount,
    getAccounts : getAccounts
}
