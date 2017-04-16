var router = require('express').Router();
var Pari = require('../../../../models/Pari');
var User = require('../../../../models/User');
var passport =require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
    Pari.find({}).then(function(paris) {
        res.json(paris);
    });
});

router.get('/display', passport.authenticate('jwt', {session: false}), function(req, res) {
    Pari.find({}).sort({id: -1}).then(function(paris) {
		res.json(paris);
    });
});

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res) {

    if(req.user.admin) {
        var teamname = req.body.teamname;
        var winner = "";
        var score = 0;
        var BO = req.body.BO;
        var id = 1;

        if(!req.body.teamname[0] || !req.body.teamname[1] || !req.body.BO){
            return res.json({ message: 'Veuillez remplir tout les champs.' });
        }
        Pari.find({}).sort({id: -1}).limit(1).then(function(paris){
            if(!paris[0]){
                id = 1; 
            }else{
                id = paris[0].id + 1;
            }
            var newPari = new Pari({
                teamname: teamname,
                winner: winner,
                score: score,
                BO: BO,
                id: id
            }).save().then(function(pariSaved) {
                return res.json({message: "Votre pari a bien été créé !", pariSaved});
            });
        });

    }else{
        return res.status(401).json({message: "Vous ne pouvez pas faire cela car vous n'êtes pas un admin."})
    }
});

router.post('/edit/:id', passport.authenticate('jwt', {session: false}), function(req,res){
    if(req.user.admin){
    var winner = req.body.winner;
    var score = req.body.score;
    Pari.find({id : req.params.id}).update({$set: {winner: winner}, $set: {score: score}}).then(function(paris) {
        res.json(paris);
    });
    }else{res.status(401).json({message: "Vous ne pouvez pas faire cela car vous n'êtes pas un admin."})}
});

module.exports = router;