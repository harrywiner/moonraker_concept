const {Schema, model} = require('mongoose')

const DeviceAnomalySchema = new Schema({

    FailureRate: {type: Number, required: true},
    LatencyAvg: {type: Number, required: true},

    deviceID: {type: String, required: true},
    IsAnomaly: {type: Number, required: true}

}, { timestamps: true });

const DeviceAnomaly = model('Anomaly', DeviceAnomalySchema);

module.exports = DeviceAnomaly