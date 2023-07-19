const puppeteer = require('puppeteer');

async function bot() {

    const username='aurerojas@sharklasers.com';
    const password = 'esz.MHCft55-';


    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    await page.setDefaultNavigationTimeout(10000);


    page.on('request', (request) => {
        console.log('Se realizó una solicitud:', request.url());
      });

    //login to page
    await page.goto('https://citas.sre.gob.mx/');

    

    await page.waitForSelector(' input[name="email"]',{ timeout: 60000 })
    await page.type(' input[name="email"]',username);

    


   

    await page.waitForSelector('input[name="password"]',password)
    await page.type('input[name="password"]',password)


    

    

    await page.waitForSelector('input[type="checkbox"]');
    await page.$eval('input[type="checkbox"]', (checkbox) => checkbox.checked = true);

    const isCheckboxChecked = await page.$eval('input[type="checkbox"]', (checkbox) => checkbox.checked);

    if (isCheckboxChecked) {
        console.log('El checkbox está marcado.');
    } else {
        console.log('El checkbox no está marcado.');
    }

    await page.waitForSelector('svg.bi.bi-x-circle')
    await page.click('svg.bi.bi-x-circle')

    await page.$eval('button.btn.btn-primary.pull-right', (button) => button.removeAttribute('disabled'));
    const isButtonDisabled = await page.$eval('button.btn.btn-primary.pull-right', (button) => button.disabled);

    /*if (isButtonDisabled) {
        console.log('El botón está deshabilitado.');
      } else {
        console.log('El botón no está deshabilitado. Puedes hacer clic en él.');
        await page.click('button.btn.btn-primary.pull-right')

        const contenido = await page.$eval('div.panel-body', (elemento) => elemento.innerHTML);
        console.log(contenido)
        await page.waitForNavigation();
        console.log("logged in")
      }
*/
await page.evaluate(() => {
    const form = document.querySelector('form.form-horizontal'); // Selector del formulario
    form.submit();
    
  });
  const contenido = await page.$eval('div.panel-body', (elemento) => elemento.innerHTML);
        console.log(contenido)
  await page.waitForNavigation();
        console.log("logged in")

    await browser.close();
}

bot();


