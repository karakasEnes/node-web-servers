const axios = require("axios").default;

const geocode = (address, callback) => {
  const urlAddress = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHltYXN0ZXIiLCJhIjoiY2t0ajFyemoxMTdrNjJ2bXVmNTR6amx5eiJ9.uO2t5aE-ph23rnky9FnV8g&limit=1`;

  axios(urlAddress)
    .then((data) => {
      const [latitude, longitute] = data.data.features[0].center;
      callback(undefined, latitude, longitute);
    })
    .catch((err) => callback(err));
};

// geocode("America", (data) => {
//   // console.log(data);
//   // console.log("---------------");
//   // console.log(data.data.features);
//   const [latitude, longitute] = data.data.features[0].center;
//   console.log(latitude, longitute);
// });

// geocode("America", (data, data2) => {
//   console.log(data, data2);
// });

module.exports = geocode;
