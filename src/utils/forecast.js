const axios = require("axios").default;

const forecast = (lat, lng, callback) => {
  const weatherURL = `http://api.weatherstack.com/current?access_key=22428c50657f190b42d7558b13804570&query=${lat},${lng}`;
  axios
    .get(weatherURL)
    .then((data) => {
      const responseData = data.data;
      const forecastDescription = `${responseData.current.weather_descriptions[0]} starting in the evening. Currently outside is ${responseData.current.temperature} There is ${responseData.current.precip} change of the rain`;

      const y = {
        forecastDescription,
        location: responseData.location.country,
      };

      callback(undefined, y);
    })
    .catch((err) => callback(err));
};

// const testLat = 39.3812661305678;
// const testLng = -97.9222112121185;

// forecast(testLat, testLng, (desc) => {
//   console.log(desc);
// });

module.exports = forecast;
