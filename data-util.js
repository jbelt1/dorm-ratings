var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.load();
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true});
mongoose.connection.on('error',function(err){
    console.log(err)
    console.log("Connection was unable to take place");
    process.exit(1);
});


const dormNames = [
    "Bel Air", "Cambridge",
    "Centreville","Chestertown", 
    "Cumberland", "Denton", "Easton",
    "Elkton", "Oakland", 
    "Ellicott", "Hagerstown",
    "La Plata", "Anne Arundel",
    "Caroline", "Carroll",
    "Dorchester", "Prince Frederick", 
    "Queen Anne's", "St. Mary's",
    "Somerset", "Wicomico",
    "Worcester", "Allegany",
    "Baltimore", "Calvert", 
    "Cecil", "Charles", 
    "Frederick", "Garrett",
    "Harford", "Howard",
    "Kent", "Montgomery", 
    "Prince George's", "Talbot",
    "Washington"
];

const dormIdToName = {
    "bel_air":"Bel Air", "cambridge":"Cambridge", "centreville": "Centreville",
    "chestertown":"Chestertown", "cumberland":"Cumberland", "denton":"Denton",
    "easton":"Easton", "elkton":"Elkton", "oakland":"Oakland", "ellicott":"Ellicott", 
    "hagerstown":"Hagerstown", "la_plata":"La Plata", "anne_arundel":"Anne Arundel", 
    "caroline":"Caroline", "carroll":"Carroll", "dorchester":"Dorchester", "prince_frederick":"Prince Frederick",
    "queen_anne's":"Queen Anne's", "st._mary's":"St. Mary's", "somerset":"Somerset", "wicomico":"Wicomico",
    "worcester":"Worcester", "allegany":"Allegany", "baltimore":"Baltimore", "calvert":"Calvert",
    "cecil":"Cecil", "charles":"Charles", "frederick":"Frederick", "garrett":"Garrett", 
    "harford":"Harford", "howard":"Howard", "kent":"Kent", "montgomery":"Montgomery",
    "prince_george's":"Prince George's", "talbot":"Talbot", "washington":"Washington"
}

module.exports = {
    dormNames: dormNames.sort(),
    dormIdToName: dormIdToName
}