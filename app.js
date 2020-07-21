const dotenv = require('dotenv');
dotenv.config({path:'./config/.env'});


const consumerConfig = require('./config/consumerConfig')
const producerConfig = require('./config/producerConfig')
const topics = require('./config/topics')

const smsGenerate = require('./generate/smsGenerate')
const smsController = require('./controller/smsController');


const url = process.env.MONGODB;

var mongoose = require('mongoose');
mongoose.connect(url+'/SMS', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise;
const db = mongoose.connection;
let obj = smsGenerate.sms(100);
// console.log(obj[0])

smsController.insert(obj);

// console.log(process.env.MONGODB);


// let obj = smsGenerate.sms(1000);


// var json = JSON.stringify(obj);
// console.log(json)