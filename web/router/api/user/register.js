var router = require('express').Router();
var User = require('../../../../models/User');
var hash = require('../../../../helpers/hash');
var passport =require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
    if(req.user.admin) {
        User.find({}).then(function(users) {
            res.json(users);
        });
    }
});

router.get('/infoAccount', passport.authenticate('jwt', {session: false}), function(req, res){
    res.json(req.user);
});

router.post('/id_steam', passport.authenticate('jwt', {session: false}), function(req, res){
    User.find({username: req.user.username}).update({$set: {id_steam: req.body.id_steam}}).then(function(user) {
        res.json(user);
    });
});

router.post('/username', passport.authenticate('jwt', {session: false}), function(req, res){
    var username = req.body.username;
    User.find({}).then(function(users) {
                for(user in users)
                {
                    if(users[user].username == username){
                        return res.json({ success: false,
                        message: 'Le nom d\'utilisateur n\'est pas disponnible.'});
                    }
                }
                User.find({username: req.user.username}).update({$set: {username: req.body.username}}).then(function(user) {
                    res.json(user);
                });
        });
});

router.post('/email', passport.authenticate('jwt', {session: false}), function(req, res){
    var email = req.body.email;
    User.find({}).then(function(users) {
                for(user in users)
                {
                    if(users[user].email == email){
                        return res.json({ success: false,
                        message: 'L\'email n\'est pas disponnible.'});
                    }
                }
                User.find({username: req.user.username}).update({$set: {email: req.body.email}}).then(function(user) {
                    res.json(user);
                });
        });
});

router.post('/password', passport.authenticate('jwt', {session: false}), function(req, res){
    var password = hash.hashPassword(req.body.password); 
    User.find({username: req.user.username}).update({$set: {password: password}}).then(function(user) {
        res.json(user);
    });
});

router.post('/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var id_steam = req.body.id_steam;
    var admin = req.body.admin;
    var del = req.body.del;

    if(!req.body.id_steam){
               id_steam = "";     
    }
    if(!req.body.email || !req.body.password || !req.body.username)
    {
        res.json({ success: false, message: 'Veuillez remplir tout les champs.' });
    } else {

        var newUser = new User({
            username: username,
            email: email,
            password: hash.hashPassword(password),
            id_steam: id_steam,
            admin: admin,
            del: del
        });

        User.find({}).then(function(users) {
                for(user in users)
                {
                    if(users[user].username == username || users[user].email == email){
                        return res.json({ success: false,
                        message: 'Email ou le nom d\'utilisateur déja existant.'});
                    }
                }
                newUser.save(function(err){
                    res.json({success: true, message: 'Votre comptre a bien été créé.'});
                });
        });
    }
});

module.exports = router;
