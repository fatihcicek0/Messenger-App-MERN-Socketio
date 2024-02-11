import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors'
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
import config from "./config/config";
import authRoute from './routes/auth';
import conversationRoute from './routes/conversation';
import messageRoute from './routes/message';
import userRoute from './routes/user';


app.use(cors())

app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);


mongoose.connect(config.MONGO_CONNECT_URL, { useNewUrlParser: true } as ConnectOptions
)
    .then(() => {
        app.listen(3000, () => {
            console.log("listenin on localhost:3000 :) ")
        })

    }).catch(err => { console.log(err) });

