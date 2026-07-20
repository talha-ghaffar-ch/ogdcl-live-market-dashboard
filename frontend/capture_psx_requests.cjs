const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const requests = [];
  page.on('request', request => {
    if (request.url().includes('api') || request.url().includes('timeseries') || request.url().includes('json') || request.url().includes('data')) {
      requests.push(request.url());
    }
  });

  try {
    await page.goto('https://dps.psx.com.pk/company/OGDC', { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (e) {
    console.log('Timeout or error:', e.message);
  }

  console.log('Captured requests:');
  requests.forEach(r => console.log(r));

  await browser.close();
})();
