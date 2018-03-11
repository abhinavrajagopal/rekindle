var router = require('express').Router(),
    dataModel = require('../models/data');

router.route("/")
.get((req, res, next)=>{
    
    new dataModel({
        value1 : req.query.value,
        value2 : req.query.value1,
        value3 : req.query.value2,
    }).save()
    .then(()=>res.send("OK"))
    .catch(next);

})


module.exports = router;