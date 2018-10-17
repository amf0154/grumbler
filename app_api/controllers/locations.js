var mongoose = require('mongoose');
var Loc = mongoose.model('Location'); 


var theEarth = (function() {
    var earthRadius = 6371; // km, miles is 3959
  
    var getDistanceFromRads = function(rads) {
      return parseFloat(rads * earthRadius);
    };
  
    var getRadsFromDistance = function(distance) {
      return parseFloat(distance / earthRadius);
    };
  
    return {
      getDistanceFromRads: getDistanceFromRads,
      getRadsFromDistance: getRadsFromDistance
    };
  })();
  
var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
    //res.render('gleb', {hello_world: "success"});
    //res.send('respond with a resource');
};

/*  BACKUP
module.exports.testReadOne = function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://muser:qwe321@ds251902.mlab.com:51902/meandb1', function(err, client){
    var collection = client.db('meandb1').collection('locations');
        collection.find().toArray(function(err,data){
            if (err) throw err;
            sendJsonResponse(res, 200, data);
        });
    });  
};
*/

module.exports.locationsCreate = function(req, res) {
  //  console.log(req.body.facilities);
  var newLocation = new Loc({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
  });
    newLocation.save(function (err) {
       if(err){ 
            console.log("error:"+err);
           sendJsonResponse(res, 200, err);
       }else{
         
           sendJsonResponse(res, 200, data);
           console.log("its ok");  
       }   
    });
    console.log(req.body);
};

module.exports.testReadOne = function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://muser:qwe321@ds251902.mlab.com:51902/meandb1', function(err, client){
    var collection = client.db('meandb1').collection('locations');
        collection.findById("5b980c629a20cb02ea9b60af",function(err,data){
            if (err) throw err;
            sendJsonResponse(res, 200, data);
        });
    });  
};

module.exports.locationsReadOne = function (req, res) {
    if(req.params && req.params.locationid){
    Loc
            .findById(req.params.locationid)
            .exec(function(err, location){
                if (!location){
              sendJsonResponse(res,404, {"message":"locationid not found"});
            return;
                }else if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
               sendJsonResponse(res,200, location);  
            });
    }else{
   sendJsonResponse(res,404, {"message":"No locationid in request"});
}
};

module.exports.locationsListByDistance = function(req, res) {
  console.log('locationsListByDistance:');
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = 10000;
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  console.log('point: ' + point)
  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(maxDistance),
    num: 10
  };
  console.log('geoOptions: ' + geoOptions);
  if ((!lng && lng!==0) || (!lat && lat!==0) || ! maxDistance) {
    console.log('locationsListByDistance missing params');
    sendJsonResponse(res, 404, {
      "message": "lng, lat and maxDistance query parameters are all required"
    });
    return;
  } else {
    console.log('locationsListByDistance running...');
    Loc.aggregate(
      [{
        '$geoNear': {
          'near': point,
          'spherical': true,
          'distanceField': 'dist.calculated',
          'maxDistance': maxDistance
        }
      }],
      function(err, results) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          locations = buildLocationList(req, res, results);
          sendJsonResponse(res, 200, locations);
        }
      }
    )
  };
};

var buildLocationList = function(req, res, results) {
  console.log('buildLocationList:');
  var locations = [];
  results.forEach(function(doc) {
      locations.push({
        distance: doc.dist.calculated,
        name: doc.name,
        address: doc.address,
        rating: doc.rating,
        facilities: doc.facilities,
        _id: doc._id
      });
  });
  return locations;
};

module.exports.locationsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};
module.exports.locationsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "del_location_by_ur_id"});
};

