const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    location: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    cleanliness: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    }, 
    amenities: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    }, 
    social: {
        type: Number, 
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: String,
    adjectives: [String]
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;