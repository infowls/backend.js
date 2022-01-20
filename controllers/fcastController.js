var axios = require("axios").default;

/**
 * fcastController.js
 *
 * @description :: Server-side logic for forecast API requests.
 */
module.exports = {

    getNow: function (req, res) {
        if (!req.params.city || !req.params.units)
            return res.status(406).json({
                message: 'Parameters not given.'
            });

        if (req.params.units != "imperial")
            if (req.params.units != "metric")
                return res.status(406).json({
                    message: 'Invalid unit parameter'
                });

        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + req.params.city +
            '&appid=' + process.env.WAPI + '&units=' + req.params.units;


        axios.get(url).then(function (response) {
            return res.status(201).json(response.data);
        }).catch(function (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error when getting data from api',
                error: error.message
            });
        });

    },

    getGeoLocation: function (req, res, next) {
        if (!req.params.city)
            return res.status(406).json({
                message: 'City not given.'
            });


        var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + req.params.city + '&appid=' + process.env.WAPI;


        axios.get(geoUrl).then(function (response) {
            res.lat = response.data[0].lat;
            res.lon = response.data[0].lon;
            return next();
        }).catch(function (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error when getting geo location from api',
                error: error.message
            });
        });

    },

    getDaily: function (req, res) {
        if (!req.params.units)
            return res.status(406).json({
                message: 'Units not given.'
            });

        if (req.params.units != "imperial")
            if (req.params.units != "metric")
                return res.status(406).json({
                    message: 'Invalid unit parameter'
                });

        var lat = res.lat;
        var lon = res.lon;
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + 
        '&appid=' + process.env.WAPI + '&units=' + req.params.units;

        axios.get(weatherUrl).then(function (response) {
            return res.status(201).json(response.data);
        }).catch(function (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error when getting geo location from api',
                error: error.message
            });
        });


    }

};