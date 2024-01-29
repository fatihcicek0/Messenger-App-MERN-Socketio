import express from 'express';
import bodyParser from 'body-parser';


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log("listenin on localhost:3000 :) ")
})
