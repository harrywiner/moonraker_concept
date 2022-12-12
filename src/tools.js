const fs = require('fs')

const DeviceAnomaly = require('../models/DeviceAnomaly')

module.exports = {

    getDeviceAnomalies: () => {
        return new Promise((resolve, reject) => {
            DeviceAnomaly.find({}, {}, (err, deviceAnomalies) => {
                if (err) {
                    reject(err)
                } else {
                    deserialized = deviceAnomalies.map(deserializeDeviceAnomaly)
                    resolve(deserialized)
                }
            })
        })
    },

    getData: () => {
        let rawdata = fs.readFileSync('json/devices.json');
        return JSON.parse(rawdata);
    }
}

function deserializeDeviceAnomaly(deviceAnomaly) {
    return {
        "FailureRate": deviceAnomaly.FailureRate,
        "LatencyAvg": deviceAnomaly.LatencyAvg,
        "deviceID": deviceAnomaly.deviceID,
        "IsAnomaly": deviceAnomaly.IsAnomaly
    }
}