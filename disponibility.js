const { Builder, By, until } = require('selenium-webdriver');

const sendToTm = require('./calls.js')

async function checkDisponibility(driver, ciudades) {
    try{
        const enlaceActual = await driver.getCurrentUrl();
        if(enlaceActual != 'https://citas.sre.gob.mx/appointment')
         await driver.get('https://citas.sre.gob.mx/appointment');


        await driver.wait(until.elementLocated(By.css('div.modal-body')), 20000);
        const modalBody3 = await driver.findElement(By.css('div.modal-body'));
        const isModalBody3Visible = await modalBody3.isDisplayed();

        if (isModalBody3Visible) {
          await driver.wait(until.elementLocated(By.css('div.modal-body > div > a > span > svg')), 20000);
          await driver.findElement(By.css('div.modal-body > div > a > span > svg')).click();
        }

        await driver.wait(until.elementLocated(By.css('div.modal-body')), 20000);

        intentos = 0;

        
        await driver.wait(async function () {
          const container = await driver.findElement(By.css('form > .col-sm-12 > div > div:nth-child(3)'));
          const childElements = await container.findElements(By.css('div.card-body'));
          return childElements.length > 0;
        }, 100000);


        const container = await driver.findElement(By.css('form > .col-sm-12 > div > div:nth-child(3)'));
        const childElements = await container.findElements(By.css('div.card-body > p:nth-child(1) > span'));
    
        for (const date of childElements) {
        const divText = await date.getText();
        
        for (const ciudad of ciudades) {
            if (divText.includes(ciudad.city.toUpperCase())) {
                await sendToTm(`ATENCION\n============================================\n\nHay citas disponibles en ${ciudad.city.toUpperCase()}\n\n============================================`)
                console.log(`Hay citas disponibles en ${ciudad.city.toUpperCase()}`);
            }
        }
        }
        return true
        
    }catch(error){
      console.log(error)
        
        return false
    }
    
  }

  module.exports = {checkDisponibility};