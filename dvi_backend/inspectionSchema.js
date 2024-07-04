const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspectionSchema = new Schema({
    vin: { type: String, required: true, },
    license: { 
        num: { type: String },
        state: { type: String }, 
    },
    mileage: { type: Number, required: true },
    date: { type: Date, requied: true },
    owner: { type: String, required: true },
    tech: { type: String, required: true },
    wo: { type: String, required: true },
    
    //data 
})

const Inspection = mongoose.model('Inspection', inspectionSchema);
module.exports = Inspection;