import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();



let mongoUrl: any = process.env.MONGO_CONNECT_URL;
mongoose.connect(mongoUrl)
    .then(() => {
        app.listen(3000, () => {
            console.log("listenin on localhost:3000 :) ")
        })

    }).catch(err => { console.log(err) });

