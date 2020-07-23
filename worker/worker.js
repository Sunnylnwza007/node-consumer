'use strict';
const { Worker, isMainThread, parentPort,workerData } = require('worker_threads');
const numCPUs = require('os').cpus().length;
const _ = require('lodash');
const axios = require('axios');
const api = axios.create({})

let  worker = async (obj)=>{
    let data = JSON.parse(obj)
    var chunk = _.chunk(data,(data.length/(numCPUs/2)))
    const threads = new Set();
  
      if (isMainThread) {
        for (let i = 0;i<chunk.length;i++){
          await threads.add(new Worker('../worker/threads.js', { workerData: {data: chunk[i]}}));
        }
        for (let worker of threads) {
          worker.on('error', (err) => { throw err; });
          worker.on('exit', () => {
            threads.delete(worker);
            console.log(`Thread exiting, ${threads.size} running...`);
          })
          worker.on('message', (msg) => {
            // console.log(msg)
          });
        }
  
      } else {

      }
    }
  
  module.exports = worker