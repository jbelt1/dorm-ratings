var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util.js");
var _ = require('underscore');

const Review = require('./Review.js')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others. 
 */

const dormNames = dataUtil.dormNames;
const dormIdToName = dataUtil.dormIdToName;

app.get('/', (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
            }
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4) 
            let info = {
                name: name,
                rateOverall: rateOverall,
                numReviews: numReviews
            }
            dorms.push(info); 
        }
        res.render('dorms', {
            type: "",
            dorms: dorms,
        });
    })
});

app.get("/random", (req, res) => {
    let randomDorm = _.sample(Object.keys(dormIdToName));
    res.redirect("/dorm/"+randomDorm);
})

app.get("/clean", (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
            }
            let rateCleanliness = numReviews===0 ? "0.0" : roundToTenths(cleanliness/numReviews);
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4)
            if (parseFloat(rateCleanliness) >= 3.0) {
                let info = {
                    name: name,
                    rateOverall: rateOverall,
                    numReviews: numReviews
                }
                dorms.push(info); 
            }
        }
        dorms = _.sortBy(dorms, "rateOverall").reverse();
        res.render('dorms', {
            type: "Cleanest",
            dorms: dorms,
        });
    })
})

app.get('/social', (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
            }
            let rateSocial = numReviews===0 ? "0.0" : roundToTenths(social/numReviews);
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4)
            if (parseFloat(rateSocial) >= 3.0) {
                let info = {
                    name: name,
                    rateOverall: rateOverall,
                    numReviews: numReviews
                }
                dorms.push(info); 
            }
        }
        dorms = _.sortBy(dorms, "rateOverall").reverse();
        res.render('dorms', {
            type: "Most Social",
            dorms: dorms,
        });
    })
})

app.get('/convenient', (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
            }
            let rateLocation = numReviews===0 ? "0.0" : roundToTenths(location/numReviews);
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4)
            if (parseFloat(rateLocation) >= 3.0) {
                let info = {
                    name: name,
                    rateOverall: rateOverall,
                    numReviews: numReviews
                }
                dorms.push(info); 
            }
        }
        dorms = _.sortBy(dorms, "rateOverall").reverse();
        res.render('dorms', {
            type: "Most Convenient",
            dorms: dorms,
        });
    })
})

app.get('/quality', (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
            }
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4)
            if (parseFloat(rateOverall) >= 3.5) {
                let info = {
                    name: name,
                    rateOverall: rateOverall,
                    numReviews: numReviews
                }
                dorms.push(info); 
            }
        }
        dorms = _.sortBy(dorms, "rateOverall").reverse();
        res.render('dorms', {
            type: "Highest Quality",
            dorms: dorms
        });
    })
})

app.get('/dorm/:dormName', (req, res) => {
    let name = dormIdToName[req.params.dormName];
    Review.find({name: name}, (err, reviews) => {
        let cleanliness = location = amenities = social = 0.0;
        let userReviews = [];
        let numReviews = reviews.length;
        for (review of reviews) {
            let overall = 0.0;
            cleanliness += review.cleanliness;
            location += review.location;
            amenities += review.amenities;
            social += review.social;
            overall = (review.social+review.amenities+review.location+review.cleanliness)/4;
            overall = roundToTenths(overall);
            userReviews.push({
                overall,
                user: review.user,
                comment: review.comment,
                adjectives: review.adjectives,
            });
        }
        let rateCleanliness = numReviews===0 ? "0.0" : roundToTenths(cleanliness/numReviews);
        let rateLocation = numReviews===0 ? "0.0" : roundToTenths(location/numReviews);
        let rateAmenities = numReviews===0 ? "0.0" : roundToTenths(amenities/numReviews);
        let rateSocial = numReviews===0 ? "0.0" : roundToTenths(social/numReviews);
        let rateOverall = numReviews===0 ? "0.0" :
                    roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4) 
        let info = {
            name: name,
            rateCleanliness: rateCleanliness,
            rateLocation: rateLocation,
            rateAmenities: rateAmenities,
            rateSocial: rateSocial,
            rateOverall: rateOverall,
            userReviews: userReviews,
            numReviews: numReviews
        }
        res.render('dorm', {
            info: info
        })
    })
})

app.get('/addReview/:dormName', (req, res) => {
    let name = dormIdToName[req.params.dormName]
    res.render('addReview', {name})
})

app.get('/api/getAllReviews', (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let userReviews = [];
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
                userReviews.push(review);
            }
            let rateCleanliness = numReviews===0 ? "0.0" : roundToTenths(cleanliness/numReviews);
            let rateLocation = numReviews===0 ? "0.0" : roundToTenths(location/numReviews);
            let rateAmenities = numReviews===0 ? "0.0" : roundToTenths(amenities/numReviews);
            let rateSocial = numReviews===0 ? "0.0" : roundToTenths(social/numReviews);
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4) 
            let info = {
                name: name,
                rateCleanliness: rateCleanliness,
                rateLocation: rateLocation,
                rateAmenities: rateAmenities,
                rateSocial: rateSocial,
                rateOverall: rateOverall,
                userReviews: userReviews,
                numReviews: numReviews
            }
            dorms.push(info); 
        }
        res.json(dorms);
    })
})

app.get("/api/getBestDorms", (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let userReviews = [];
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
                userReviews.push(review);
            }
            let rateCleanliness = numReviews===0 ? "0.0" : roundToTenths(cleanliness/numReviews);
            let rateLocation = numReviews===0 ? "0.0" : roundToTenths(location/numReviews);
            let rateAmenities = numReviews===0 ? "0.0" : roundToTenths(amenities/numReviews);
            let rateSocial = numReviews===0 ? "0.0" : roundToTenths(social/numReviews);
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4) 
            if (parseFloat(rateOverall) >= 3.5) {
                let info = {
                    name: name,
                    rateCleanliness: rateCleanliness,
                    rateLocation: rateLocation,
                    rateAmenities: rateAmenities,
                    rateSocial: rateSocial,
                    rateOverall: rateOverall,
                    userReviews: userReviews,
                    numReviews: numReviews
                }
                dorms.push(info); 
            }
        }
        res.json(dorms);
    })
})

app.get("/api/getCleanestDorms", (req, res) => {
    let dorms = [];
    Review.find({}, (err, reviews) => {
        if (err) throw err;
        for (name of dormNames) {
            let cleanliness = location = amenities = social = 0.0;
            let userReviews = [];
            let dormReviews = _.where(reviews, {name: name});
            let numReviews = dormReviews.length;
            for (review of dormReviews) {
                cleanliness += review.cleanliness;
                location += review.location;
                amenities += review.amenities;
                social += review.social;
                userReviews.push(review);
            }
            let rateCleanliness = numReviews===0 ? "0.0" : roundToTenths(cleanliness/numReviews);
            let rateLocation = numReviews===0 ? "0.0" : roundToTenths(location/numReviews);
            let rateAmenities = numReviews===0 ? "0.0" : roundToTenths(amenities/numReviews);
            let rateSocial = numReviews===0 ? "0.0" : roundToTenths(social/numReviews);
            let rateOverall = numReviews===0 ? "0.0" :
                        roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4) 
            if (parseFloat(rateCleanliness) >= 3.0) {
                let info = {
                    name: name,
                    rateCleanliness: rateCleanliness,
                    rateLocation: rateLocation,
                    rateAmenities: rateAmenities,
                    rateSocial: rateSocial,
                    rateOverall: rateOverall,
                    userReviews: userReviews,
                    numReviews: numReviews
                }
                dorms.push(info); 
            }
        }
        res.json(dorms);
    })
})

app.get("/api/getRandomDorm", (req, res) => {
    let randomDorm = _.sample(dormNames);   
    Review.find({name: randomDorm}, (err, reviews) => {
        let cleanliness = location = amenities = social = 0.0;
        let userReviews = [];
        let numReviews = reviews.length;
        for (review of reviews) {
            let overall = 0.0;
            cleanliness += review.cleanliness;
            location += review.location;
            amenities += review.amenities;
            social += review.social;
            overall = (review.social+review.amenities+review.location+review.cleanliness)/4;
            overall = roundToTenths(overall);
            userReviews.push({
                overall,
                user: review.user,
                comment: review.comment,
                adjectives: review.adjectives,
            });
        }
        let rateCleanliness = numReviews===0 ? "0.0" : roundToTenths(cleanliness/numReviews);
        let rateLocation = numReviews===0 ? "0.0" : roundToTenths(location/numReviews);
        let rateAmenities = numReviews===0 ? "0.0" : roundToTenths(amenities/numReviews);
        let rateSocial = numReviews===0 ? "0.0" : roundToTenths(social/numReviews);
        let rateOverall = numReviews===0 ? "0.0" :
                    roundToTenths(((amenities+cleanliness+social+location)/numReviews)/4) 
        let info = {
            name: randomDorm,
            rateCleanliness: rateCleanliness,
            rateLocation: rateLocation,
            rateAmenities: rateAmenities,
            rateSocial: rateSocial,
            rateOverall: rateOverall,
            userReviews: userReviews,
            numReviews: numReviews
        }
        res.json(info);
    })
})

app.post('/api/addReview', (req, res) => {
    const dormName = req.body.dormName;
    if (dormNames.includes(dormName)) {
        const review = new Review({
            name: dormName,
            user: req.body.user,
            location: parseFloat(req.body.location),
            cleanliness: parseFloat(req.body.cleanliness),
            amenities: parseFloat(req.body.amenities),
            social: parseFloat(req.body.social),
            comment: req.body.comment, 
            adjectives: req.body.adjectives.split(","), 
        });

        review.save(function(err) {
            if (err) throw err;
            return res.send('Succesfully inserted review.');
        });  
    }
    else {
        res.send("Dorm doesn't exist");
    }
})

app.listen(process.env.PORT || 3000, function() {
    console.log('Residence Hall Reviews listening on port 3000!');
});

function roundToTenths(num) {
    return Math.max( Math.round(num * 10) / 10, 0.0 ).toFixed(1);
}