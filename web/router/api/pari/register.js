var router = require('express').Router();
var Pari = require('../../../../models/Pari');
var User = require('../../../../models/User');
var passport =require('passport');

router.get('/', function(req, res) {
    Pari.find({}).then(function(paris) {
        res.json(paris);
    });
});

router.get('/display', function(req, res) {
    Pari.find({}).sort({id: -1}).limit(3).then(function(paris) {
		res.json(paris);
    });
});

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res) {

    if(req.user.admin) {
        var teamname = req.body.teamname;
        var winner = req.body.winner;
        var score = req.body.score;
        var BO = req.body.BO;

        Pari.find({}).sort(-1).limit(1).then(function(paris){
            if(paris[0].id){var id = paris[0].id + 1;}else{var id = 0;}
            var newPari = new Pari({
                teamname: teamname,
                winner: winner,
                score: score,
                BO: BO,
                id: id
            }).save().then(function(pariSaved) {
                res.json(pariSaved);
            });
        });

    }else{
        res.status(401).json({message: "Vous ne pouvez pas faire cela car vous n'êtes pas un admin."})
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

/*router.delete('/delete/:id',function(req,res){
    Pari.find({id : req.params.id}).remove({});
    res.json("Le pari est supprimé");
});*/

module.exports = router;