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

router.post('/id_steam', passport.authenticate('jwt', {session: false}), function(req, res){
    var id_steam = req.body.id_steam;
    User.findOne({username: req.user.username}).update({$set: {id_steam: id_steam}});
});

router.post('/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var id_steam = req.body.id_steam;
    var admin = req.body.admin;
    var del = req.body.del;

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
