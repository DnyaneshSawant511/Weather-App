const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 4000;
const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get('/get_temperature', (req, res) => {
    var address = req.query.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+address+"&units=metric&appid="+API_KEY;
    axios.get(url).then(response => {
        const data = response.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;
        const msg = "City Name = " + cityName + "    Temperature = " + temperature;
        res.render('weather.ejs', {cityName : address, temperature : temperature, wind : wind, humidity : humidity});
    })
    .catch(error => {
        console.error(error);
        res.status(500).send("Error!");
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});