var router = require('express').Router(),
    dataModel = require('../models/data');

/* GET home page. */
router.route('/')
.get((req, res, next)=>{
    res.render('index', { title: 'Express' });
})

.post((req, res, next)=>{
    
    dataModel.find()
    .then((data)=>res.json(data))
    .catch(next);

})

module.exports = router;
