const mongoose = require('mongoose');

module.exports = function connect(url) {
    mongoose
        .connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => console.log('Mongoose Connected'))
        .catch(err =>
            console.log(err));
}