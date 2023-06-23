require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

mongoose.connect(process.env.mongodb_url).then(function(){

    app.get("/", function(req, res){
        res.send("This is the Home");
    });

    const noteRouter = require('./routes/Note');
    app.use("/notes", noteRouter);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log("Server Listening at port no. 5000")
});