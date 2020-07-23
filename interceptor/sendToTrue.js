// const { insertSMID } = require("./controllerSendTopicToKafka")
const axios = require("axios");
const moment = require("moment");
var xml2js = require("xml2js");
var parseString = require("xml2js").parseString;
var builder = new xml2js.Builder({xmldec:{'version': '1.0', 'encoding': 'TIS-620'}});
var xmlTrue = require('../controller/xmlTrue')
const MAX_REQUESTS_COUNT = 500;
const INTERVAL_MS = 1000;
let PENDING_REQUESTS = 0;
// create new axios instance
const api = axios.create({});
var i = 0
var data;
var config = {
  headers: {'Content-Type': 'text/xml'}
};

/**
 * Axios Request Interceptor
 */
api.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    // console.log(config)
    let log = `start : ${moment().format("YYYY-MM-DD HH:mm:ss")}\n`;
    let interval = setInterval(() => {

        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
            PENDING_REQUESTS++
            clearInterval(interval)
            resolve(config)
        }
    }, INTERVAL_MS)
    // resolve(config);
  });
});

/**
 * Axios Response Interceptor
 */
api.interceptors.response.use(
  async (response) => {
    
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    var res = await convertXMLToJSON(response.data);
    console.log(JSON.stringify(res.message.$.id))
    let log = `end : ${moment().format("YYYY-MM-DD HH:mm:ss")}\n`;

    // // insertSMID("InsertSMID", payload,producerInstance)

    return Promise.resolve(response.data);
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  }
);

const getParams = (options) => {
  let txt = "";
  let index = 0;
  for (const key in options) {
    txt += `${key}=${options[key]}`;
    if (index !== Object.keys(options).length - 1) txt += "&";
    index++;
  }
  // console.log(txt)
  return txt;
};

const convertXMLToJSON = (xml) => {
  return new Promise((resolve, reject) => {
    try {
      parseString(xml, function (err, result) {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// function myLoop() {         
//   setTimeout(async function() {
//     try {
//       var xml = await xmlTrue.convertJSONToXML(data[i])
//       api.post(`http://192.168.60.37/SMSLink/SendMsg/TRUE.php`,xml,config)
//     } catch (error) {
//       console.log("error : ", error);
//     }
//     i++;                    
//     if (i < data.length) {           
//       myLoop();             
//     }else{
//       i = 0;
//       data = null
//       console.log('finish')
//     }                     
//   }, 100)
// }

const sendToTRUE = async (params) => {
  
  try {
    for (let i = 0; i < params.length; i++) {
      var xml = await xmlTrue.convertJSONToXML(params[i])
      api.post(`http://192.168.60.37/SMSLink/SendMsg/TRUE.php`,xml,config)
    }
  } catch (error) {
    console.log("error : ", error);
  }
  // data = params;
  // myLoop();
};

module.exports.sendToTRUE = sendToTRUE;
