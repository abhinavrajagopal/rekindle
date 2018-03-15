const   dataModel = require('../models/data'),
        userModel = require('../models/user'),
        Promise = require('bluebird');

const listDevices = (userID, role)=>{

    let query = {}, promise = Promise.resolve();

    if(role != "admin")
        promise = userModel.findById(userID, { _id : false, devices : true })

    return promise.then((data)=>{

        let dataQuery = {};

        if(role != "admin") dataQuery["id"] = { $in : (data || {}).devices };

        return dataModel.find(dataQuery).distinct('id');
    })
    .catch((err)=>{
        console.log("Error listDevices - ", err)
        return Promise.reject(err);
    })

}

const deviceData = (deviceID, userID, role) => {

    let query = { id : deviceID };

    return  dataModel.findOne(query).sort({ 'created_at' : -1 })
            .catch((err)=>{
                console.log("Error deviceData - ", err);
            })
}

module.exports = {
    deviceData : deviceData,
    listDevices : listDevices
};
