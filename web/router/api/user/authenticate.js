var router = require('express').Router();
var User = require('../../../../models/User');
var hash = require('../../../../helpers/hash');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = "FromHumanToGod";

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);

    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (! user) {
            res.status(401).json({message:"Utilisateur non trouvé"});
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

router.use(passport.initialize());

router.use(bodyParser.urlencoded({
  extended: true
}));

router.post("/", function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (!user) {
        return res.status(401).json({message:"Utilisateur non trouvé"});
    }

   if (hash.hashPassword(req.body.password) == user.password) {
          if (!user.del) {
              var payload = {id: user.id};
              var token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({message: "Vous êtes connecté.", token: token});
          }
          else {
              res.status(401).json({message:"Mauvais compte."});
          }
      }
      else {
          res.status(401).json({message:"Mauvais mot de passe."});
      }
  });

});

module.exports = router;
