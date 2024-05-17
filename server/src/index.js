import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'

const app = express();

//converts data from front end into json
app.use(express.json());

app.use(cors());

app.listen(3001, () => console.log("SERVER STARTED")); //tell api to start