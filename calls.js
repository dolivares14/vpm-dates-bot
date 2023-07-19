const axios = require('axios')
const { response } = require('express')


async function sendToTm(message){
    axios.post('https://vpm-telegram-bot.onrender.com/sendmessage',{data:message})
    .then(response =>{
        console.log("mensaje enviada a ws")
    }).catch(error=>{
        console.error(error);
      })
}


module.exports = sendToTm

