var mongoose = require('mongoose');
var Loc = mongoose.model('Location'); 
var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.reviewsCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
    //res.render('gleb', {hello_world: "success"});
    //res.send('respond with a resource');
};
module.exports.reviewsListByDistance = function (req, res) {
    sendJsonResponse(res, 200, {"status": "api/locations"});
};




module.exports.reviewsReadOne = function (req, res) {
    //sendJsonResponse(res, 200, {"status": "/api/locations/id_post/reviews/id_review"});
    if(req.params && req.params.locationid && req.params.reviewid) {
        Loc
                .findById(req.params.locationid)
                .select('name reviews')
                .exec(
                function(err, location) {
                    var response, review;
            if (!location) {
                sendJsonResponse(res, 404, {"message": "locationid not found"});
                return;
                } else if(err){
                    sendJsonResponse(res, 400, err);
                    return;
                }
    if(location.reviews && location.reviews.length > 0) {
        review = location.reviews.filter(obj => obj.toObject().id == req.params.reviewid);
        if (!review){
           sendJsonResponse(res, 404, {"message": "review not found"}); 
        } else {
            response = {
                location : {
                    name: location.name,
                    id : req.params.locationid
                },
                review : review
            };
            sendJsonResponse(res, 200, response);
        }
    } else {
        sendJsonResponse(res, 404, {"message": "Reviews not found"});
    }                   
                }
                );
    }else {
        sendJsonResponse(res, 404, {"message": "Not found, locationid and reviewid are both required"});
        
    }
};



module.exports.reviewsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};
module.exports.reviewsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "del_location_by_ur_id"});
};


