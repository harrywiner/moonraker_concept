const fs = require('fs')
module.exports = {
    getData: () => {
        let rawdata = fs.readFileSync('json/devices.json');
        return JSON.parse(rawdata);
    }
}