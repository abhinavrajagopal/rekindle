const   router = require('express').Router(),
        dataModel = require('../models/data'),
        userModel = require('../models/user'),
        passport = require('passport');

/* GET home page. */
router.route('/')
.get((req, res, next)=>{

    return res.redirect('/login');

    res.render('index', { title: 'Express' });
})

.post((req, res, next)=>{

    dataModel.find()
    .then((data)=>res.json(data))
    .catch(next);

});

router.route('/login')
.get((req, res, next)=>{

    if(req.user)    return res.redirect('/dashboard');

    return res.render('login', { message : req.flash('failureFlash') });

})
.post(passport.authenticate('local', { failureRedirect : '/login' }), function(req, res, next){
    res.redirect('/dashboard');
});

router.route('/admin')
.get((req, res, next)=>{

    userModel.findOne({role : "admin"})
    .then(function(doc){
        req.logIn(doc, function(err){
            if(err)	return next(err);
            res.redirect('/dashboard')
        })
    })

})

router.route('/test')
.get((req, res, next)=>{

    userModel.findOne({role : "client"})
    .then(function(doc){
        req.logIn(doc, function(err){
            if(err)	return next(err);
            res.redirect('/dashboard')
        })
    })

})

router.route('/logout')
.get((req, res, next)=>{
    req.logout();
    res.redirect('/login');
})

module.exports = router;
