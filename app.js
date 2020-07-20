const dotenv = require('dotenv');
const consumerConfig = require('./config/consumerConfig')
const producerConfig = require('./config/producerConfig')
const topics = require('./config/topics')



dotenv.config({path:'./config/.env'});




console.log(topics.topics)