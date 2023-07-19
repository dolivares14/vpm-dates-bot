const { Builder, By, until } = require('selenium-webdriver');


async function login(driver,userdata) {
    try{
        await driver.wait(until.elementLocated(By.name('email')), 30000);

        const elementos = await driver.findElements(By.css('div.modal-body'));
        if (elementos.length > 0) {
            const modalBody = await driver.findElement(By.css('div.modal-body'));
            await driver.findElement(By.css('div.modal-body > div.container-fluid.h-100 > div > div > div > .btn.btn-primary.btn-sm:nth-child(2)')).click();
            
        } 
        

        await driver.wait(until.elementLocated(By.css('div.checkbox > label > input')), 20000);

        // Rellenar los campos de inicio de sesión
        await driver.findElement(By.name('email')).sendKeys(userdata.email);
        await driver.findElement(By.name('password')).sendKeys(userdata.pass);
        await driver.findElement(By.css('div.checkbox > label > input')).click();



        const modalBody2 = await driver.findElement(By.css('div.modal-body'));
        const isModalBody2Visible = await modalBody2.isDisplayed();

        if (isModalBody2Visible) {
            await driver.wait(until.elementLocated(By.css('div.modal-body > a > span > svg')), 20000);
            await driver.findElement(By.css('div.modal-body > a > span > svg')).click();
        }


        await driver.findElement(By.css('.btn.btn-primary.pull-right')).click();


        await driver.wait(async function () {
        const url = await driver.getCurrentUrl();
            return url === 'https://citas.sre.gob.mx/inbox';
        }, 10000);


        return true
    }catch(error){
        
        return false
    }
    
}
  

module.exports = {login};