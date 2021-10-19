require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

// This makes a folder name public static so that it is available for index.html
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:true}));

app.get("/:cityName",(req,res)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=${process.env.API_KEY}&units=metric`
    https.get(url,
    response=>{
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherInfo = JSON.parse(data);
            res.json(weatherInfo);
        })
    })
        
    
});

const port = process.env.PORT || '3000';

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})