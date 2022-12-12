const express = require('express')
const router = express.Router()
const path = require('path')
const {getData, getDeviceAnomalies} = require('./tools')

/**
 * Returns Data of the form
 * {
 *    functioning: List[Coords],
 *    malfunctioning: List[Coords]
 * }
 */


function withinBounds(datum, filters) {
    return filters.every(f => f.boundaryCheck(datum[f.property]))
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../charts/classifications.html"))
})

router.get('/proprietary', (req, res) => {
    var data = getData()
    const filters = [
        {
            property: "FailureRate",
            boundaryCheck: (value) => value < .1
        },
        {
            property: "LatencyAvg",
            boundaryCheck: (value) => value < 1000
        }
    ]
    const functioning = data.filter(e => withinBounds(e, filters))
    const malfunctioning = data.filter(e => !withinBounds(e, filters))

    res.send({functioning, malfunctioning})
})

router.get('/autoencoder', (req, res) => {
    getDeviceAnomalies().then(deviceAnomalies => {

        const functioning = deviceAnomalies.filter(e => e.IsAnomaly == 0)
        const malfunctioning = deviceAnomalies.filter(e => e.IsAnomaly == 1)

        res.send({functioning, malfunctioning})
    }).catch(err => {
        res.send(err.message)
    })

})

module.exports = router