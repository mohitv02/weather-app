const express = require("express");
const https = require("https");
const app = express();
const bodyParse = require("body-parser");
app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post('/', function(req, res) {

    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",india&appid=fceda755c2bbfc5ddde6fa3720fcb023&units=metric";
    https.get(url, function(response) {
        // response.send("Temperature of is " + +);
        // console.log(response.statusCode);
        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            const image_url = " https://openweathermap.org/img/wn/" + image + "@2x.png"
                // console.log(temp);
                // console.log(description);

            res.write("<h1>temperature of " + query + " is " + temp + " degree and the weather is " + description + " in " + query + " </h1>");
            res.write("<img src=" + image_url + ">");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("server is running");
});