var http = require('http');
var router = require('express').Router();
var User = require('../../../../models/User');
var passport =require('passport');

router.get('/getAccount', passport.authenticate('jwt', {session: false}), function(req, res) {
	var request = http.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?format=json&key=75B7029F7E2BE1CDCD463FE803416AB3&steamids=" + req.user.id_steam,
	function(reponse){
	
		var body = "";	

		reponse.on('data', function(chunk){
			body += chunk;
		});

		reponse.on('end', function(){
		if(reponse.statusCode === 200){
			try{
				var info = JSON.parse(body);
				return res.json(info);
			}catch(error){
				return res.status(401).json({ message: "Impossible de recuperer les informations"});
			}
		}else{
				return res.status(401).json({ message: "Impossible de recuperer les informations"});
			}
		});
	});
});

 
router.get('/getStatCSGO', passport.authenticate('jwt', {session: false}), function(req, res) {
	var request = http.get("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=75B7029F7E2BE1CDCD463FE803416AB3&steamid=76561197997737990" + req.user.id_steam,
	 function(reponse){
	
		var body = "";	

		reponse.on('data', function(chunk){
			body += chunk;
		});

		reponse.on('end', function(){

		if(reponse.statusCode === 200){
			try{
				var info = JSON.parse(body);
				return res.json(info);
			}catch(error){
				return res.status(401).json({ message: "Impossible de recuperer les informations"});
			}
		}else{
				return res.status(401).json({ message: "Impossible de recuperer les informations"});
			}
		});
	});
});

module.exports = router;