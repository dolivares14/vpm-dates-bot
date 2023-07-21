const { Builder, By, until } = require('selenium-webdriver');
const {login} = require('./login.js')
const {checkDisponibility} = require('./disponibility.js')




async function runBot(state) {
  // Configuración del navegador
  
 // const chromeOptions = new chrome.Options();
  //chromeOptions.addArguments('--headless');
  
  
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navegar a la página de inicio
    await driver.get('https://citas.sre.gob.mx/');

    let intentos = 0;


    


    while (intentos < 6) {
      


      const loginresult = await login(driver,state.userdata);


      if(loginresult){
        break;
      }else{
        await driver.navigate().refresh();
        intentos++;
      }
      
      if (intentos >= 5) {
        return
      }
      
    }

    

    

    console.log('Logged in');

    await driver.wait(until.elementLocated(By.css('a.btn.btn-primary')), 20000);

    intentos = 0;

    const tiempoEspera = 5000; // 5 segundos

    while (intentos < 5) {
      try {
        await driver.findElement(By.css('a.btn.btn-primary')).click();
        break;
      } catch (error) {
        console.log(`Intento ${intentos + 1}: El clic falló. Esperando ${3000/ 1000} segundos antes de volver a intentar.`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        intentos++;
      }
      if (intentos >= 5) {
        return;
        
      }
    }

    await driver.wait(async function () {
      const enlaceActual = await driver.getCurrentUrl();
      return enlaceActual !== 'https://citas.sre.gob.mx/appointment';
    }, 3000);

    intentos = 0;

    while (intentos < 3) {
    
        
        const checkresult = await checkDisponibility(driver, state.cities);

        if(checkresult){
            break
        }else{
          await driver.navigate().refresh();
          intentos++;
        }
        
        if (intentos >= 3) {
         
          return;
        }
    }
    
  } finally {
    // Cerrar el navegador al finalizar
    await driver.quit();
  }
}

module.exports = runBot
