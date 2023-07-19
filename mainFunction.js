const { Builder } = require('selenium-webdriver');
const runBot = require('./runBot');
const statesModel = require('./model/states.js')



async function  mainFunction(){
    try{
        const states = await statesModel.find().exec();
        
        
        for(const state of states){
           
           await runBot(state)
           
           console.log("ciudad terminada")
        }
        
    }catch(error){
        console.error('Error al obtener los datos de la base de datos:', error);
    }
}

module.exports= mainFunction