const smsModel = require('../models/smsModel');
exports.create = function (req, res) {
    console.log(req)
    let sms = new smsModel({
        uuid: req.uuid,
        CMD: req.CMD,
        FROM: req.FROM,
        TO: req.TO,
        REPORT: req.REPORT,
        CHARGE: req.CHARGE,
        CODE: req.CODE,
        CTYPE: req.CTYPE,
        CONTENT: req.CONTENT,
        EXPIRE: req.EXPIRE,
    });
    smsModel.create(sms)
    // smsModel.save().then(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('sms Created Successfully');
    // })
}

exports.insert = function (req,res){
    console.log(req);
    smsModel.insertMany(req, (error,res)=>{
        if (error) console.log(error);
        console.log('success');
    })
}

exports.findAll = function (req,res){
    return smsModel.find({},'-_id -__v', (err,sms) =>{
        
    })
}