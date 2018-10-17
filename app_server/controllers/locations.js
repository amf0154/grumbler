
//var myArr = new Set(['Aletx','Maria','Kitty','Julia']);
//var iterator = myArr.keys();
//console.log(iterator.next().value);

module.exports.test = function(req, res) {

    var arr = [
        {name: 'Alex', surname:'Afanasev', age:25, sex:'Male', score: 1},
        {name: 'Masha', surname:'Gunko', age:45, sex:'Female', score: 1},
        {name: 'Mikola', surname:'Denisov', age:75, sex:'Male', score: 1},
        {name: 'Katya', surname:'Rudova', age:39, sex:'Female', score: 1},
        {name: 'Julgovol', surname:'Perkonoboe', age:'', sex:'', score: 1}
    ];
 /*   
    var sort = function(x,y){
        var xW = x.sex == 'Male' ? x.score : x.score * 75;
        var yW = y.sex == 'Male' ? y.score : y.score * 75;
        return xW > yW ? 1 : -1;
    };
    
    
    var resArr = arr.sort(sort);
    console.log(resArr);
   */ 
};
module.exports.homelist = function(req, res) {
    res.render('locations-list', {
        title: 'Grumbler - find a place to work with wifi',
        pageHeader: {
            title: 'Grumbler',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Grumbler helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Grumbler help you find the place you're looking for.",
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
        }, {
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
        }, {
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
        }]
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: 'is on Grumbler because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Review Starcups on Grumbler',
        pageHeader: {
            title: 'Review Starcups'
        }
    });
};