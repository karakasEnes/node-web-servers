const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();
const port = process.env.PORT || 3000;

// Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars + views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve!
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  // res.render("index", {
  //   title: "Weather Home Page",
  //   name: "Enes karakas",
  // });

  res.send({ learning: "Test About Heroku" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Enes Karakaş",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me Page",
    message: "help me message is executed",
    name: "Enes Karakas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: "Dude enter the address ",
    });
  }

  const address = req.query.address;

  geocode(address, (error, lat = undefined, lng = undefined) => {
    if (error) {
      return res.send({ errorMessage: "Some Error" });
    }

    forecast(lng, lat, (error, response = {}) => {
      if (error) {
        return res.send({ errorMessage: "Some Error" });
      }
      res.send({
        forecast: response.forecastDescription,
        location: response.location,
        address: address,
      });
    });
  });
});

app.get("/help/data", (req, res) => {
  res.send("Data of the Help.");
});

// app.get("/help/*", (req, res) => {
//   res.render("404", {
//     title: "Help 404 message!",
//     name: "Enes Karakas",
//     errorMessage: "Help 404 Message...",
//   });
// });

// app.get("*", (req, res) => {
//   res.render("404", {
//     title: "General 404 message!",
//     name: "Enes Karakas",
//     errorMessage: "General 404 Message",
//   });
// });

app.listen(port, () => {
  console.log("Listenin the server on port " + port);
});
