const   router = require('express').Router(),
        dataUtility = require('../utility/data');

router.route("/")
.get((req, res, next)=>{

    if(!req.user)   return res.redirect('/login');

    res.render('dashboard');
})
.post((req, res, next)=>{

    let promise;

    if(req.body.id)
        promise = dataUtility.deviceData(req.body.id, req.user._id, req.user.role);

    else
        promise = dataUtility.listDevices(req.user._id, req.user.role);

    promise.then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        console.log("Error POST /dashboard - ", err);
        return next(err);
    })

})

module.exports = router;
