'use strict';
const { Worker, isMainThread, parentPort,workerData } = require('worker_threads');
const axios = require('axios');
const api = axios.create({})
const sendToOperator = require('../interceptor/sendToTrue')

var i = 0;

// function myLoop() {         
//   setTimeout(function() {   
//     console.log(i,workerData.data[i].TO);   
//     i++;                    
//     if (i < workerData.data.length) {           
//       myLoop();             
//     }                       
//   }, 500)
// }

// myLoop();

sendToOperator.sendToTRUE(workerData.data)


parentPort.postMessage(workerData.data);
