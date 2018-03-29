const   router = require('express').Router(),
        utility = require('../utility/utility'),
        accountUtility = require('../utility/account'),
        dataUtility = require('../utility/data');

router.use(utility.routeAuth('all'))

router.route("/")
.get((req, res, next)=>{
    res.render('dashboard', { showDevices : (req.user.role === "admin") });
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

router.use(utility.routeAuth(['admin']))

router.route('/accounts')
.get((req, res, next)=>{
    res.render('accounts')
})
.post((req, res, next)=>{

    accountUtility.getAccounts()
    .then((data)=>{
        res.json(data);
    })
    .catch(next);

})
.put((req, res, next)=>{

    let duplicateError = new Error("Username already exists");
        duplicateError.error = "Username already exists";
        duplicateError.custom = true;

    accountUtility.createAccount(req.body)
    .then((doc)=>{
        res.json({ "status" : "ok" })
    })
    .catch((err)=>{
        if(err.code == 11000)
            return next(duplicateError);
        next(err);
    });
})

module.exports = router;
