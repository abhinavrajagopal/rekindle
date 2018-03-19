var router = require('express').Router(),
    dataModel = require('../models/data');

router.route("/")
.get((req, res, next)=>{

    console.log("QUERY", req.query)
    new dataModel({
        id : req.query.coreid,
        room : req.query.id,
        perc : req.query.perc,
        dropCount : req.query.dropCount,
        status : req.query.status,
        botml : req.query.botml,
    }).save()
    .then(()=>res.send("OK"))
    .catch((err)=>{
        console.log(err);
        console.log("REQ ", req.query)
    });

})


module.exports = router;
