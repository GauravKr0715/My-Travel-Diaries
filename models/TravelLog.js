// Main Log Entry file...

const mongoose = require('mongoose');

const requiredNumber = {
    type: Number,
    required: true,
};
  
const logEntrySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    visitDate: {
        required: true,
        type: Date,
    },
},
{
    timestamps: true,
}
);

const travelLogSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    logs: [logEntrySchema]
});

module.exports = mongoose.model('TravelLog', travelLogSchema);