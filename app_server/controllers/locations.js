/* Получить (GET) домашнюю страницу */
module.exports.homelist = function(req, res){
res.render('index', { title: 'Home' });
};
/* Получить (GET) страницу с информацией о местоположениях */
module.exports.locationInfo = function(req, res){
res.render('index', { title: 'Location info' });
};
/* Получить (GET) страницу добавления отзыва */
module.exports.addReview = function(req, res){
res.render('index', { title: 'Add review' });
};