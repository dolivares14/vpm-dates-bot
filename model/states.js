const mongoose = require('mongoose');

const stateSchema =  new mongoose.Schema({
    userdata:{
        email:String,
        pass:String
    },
    cities:[{city:String, open:Boolean}]
})

const stateModel = mongoose.model('states',stateSchema);

module.exports = stateModel;