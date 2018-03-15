const userModel = require('../models/user');

let userData = {
    username : "Admin",
    password : "pass",
    role : "admin"
};

console.log("init.js")

/*

new userModel(userData)
.save()
.then((data)=>{
    console.dir(data);
});


userModel.findOne()
.then((doc)=>{
    return doc.comparePassword(userData.password + "sad");
})
.then( data => console.log(data) )
.catch((err)=>  console.log(err)    )


*/
