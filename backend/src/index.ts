import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
import config from "./config/config";


const uri = process.env.MONGO_CONNECT_URL 
console.log(process.env.MONGO_CONNECT_URL);
//|| "mongodb://localhost:27017/mydb"
mongoose.connect( config.MONGO_CONNECT_URL, { useNewUrlParser: true } as ConnectOptions
   // {useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true} as ConnectOptions
)
    .then(() => {
        app.listen(3000, () => {
            console.log("listenin on localhost:3000 :) ")
        })

    }).catch(err => { console.log(err) });

