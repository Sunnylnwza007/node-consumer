'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config({path:'../config/.env'});
const url = process.env.MONGODB;
const perf = require('execution-time')();
var ConsumerGroup = require('kafka-node').ConsumerGroup;

//controller
const smsController = require('../controller/smsController');
const Worker = require('../worker/worker');

//config
const consumerConfig = require('../config/consumerConfig')
var consumerOption = consumerConfig.consumerOption;

mongoose.connect(url+'/SMS', { useNewUrlParser: true, useUnifiedTopology: true })

var consumerGroup = new ConsumerGroup(consumerOption, 'Normal');
consumerGroup.on('message', onMessage);
consumerGroup.on('error', (err) => {
  console.log(`error on consumerGroup`);
  console.log(err);
});

async function onMessage (message) {
    // console.log(message.value);
    var messageValue = JSON.parse(JSON.stringify(message.value));
    var obj = JSON.parse(messageValue);
    // console.log(obj)
    Worker(messageValue);
}