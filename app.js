const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./db-config.json');

const  mainFunction  = require('./mainFunction');
const { url, options } = dbConfig.mongodb;



mongoose.connect('mongodb+srv://dolivares:8QquALI73IazMWEj@maincluster.jlfnz4h.mongodb.net/citasdb', options)
  .then( () => {
    console.log('Conectado a MongoDB');


      
    // Iniciar el servidor después de conectar a MongoDB
    app.listen(3000, () => {
      console.log('Servidor iniciado en el puerto 3000');
      // Ejecutar la función principal al iniciar el servidor
      mainFunction();

      // Ejecutar la función principal cada 10 minutos
      setInterval(mainFunction, 10 * 60 * 1000); // 10 minutos en milisegundos
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

const app = express();