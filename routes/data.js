var router = require('express').Router(),
    dataModel = require('../models/data');

router.route("/")
.get((req, res, next)=>{
    
    new dataModel(req.query).save()
    .then(()=>res.send("OK"))
    .catch(next);

})


module.exports = router;