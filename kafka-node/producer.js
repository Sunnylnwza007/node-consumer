'use strict';
var kafka = require('kafka-node');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'../config/.env'});
const url = process.env.MONGODB;

//controller
const smsController = require('../controller/smsController');

//config
const producerConfig = require('../config/producerConfig')
const smsGenerate = require('../generate/smsGenerate')

//kafka
var Producer = kafka.HighLevelProducer;
var Client = kafka.KafkaClient;
var client = new Client({ kafkaHost: process.env.KAFKA });
var producer = new Producer(client, producerConfig.config);


let obj = smsGenerate.sms(100);
var json = JSON.stringify(obj);
// console.log(json)


//connect
mongoose.connect(url+'/SMS', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;

smsController.insert(obj)

producer.on('ready',async function () {
    console.log('ready')
    producer.send([{topic: 'Normal',messages: json , attributes: 1}], function (
      err,
      result
    ) {
      console.log(err || result);
      process.exit();
    });
});

producer.on('error', function (err) {
  console.log('error', err);
});

