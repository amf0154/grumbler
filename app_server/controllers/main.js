module.exports.index = function(req, res){
	res.render('index',{title: 'Express'});
};

module.exports.well = function(req, res){
	res.render('gleb',{hello_world: 'Hi Gleb! Enjoy with Express!!!'});
};