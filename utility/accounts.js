const   userModel = require('../models/user');

const createAccount = function(data){

    return new userModel(data).save()
            .catch((err)=>{
                console.log("Error createAccount - ", err);
                return Promise.reject(err);
            })
}

module.exports = {

}
