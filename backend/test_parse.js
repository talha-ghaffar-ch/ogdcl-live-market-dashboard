const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function test() {
  const res = await fetch('https://dps.psx.com.pk/company/OGDC');
  const html = await res.text();
  const $ = cheerio.load(html);

  const cleanNum = (str) => parseFloat(str.replace(/[^0-9.-]+/g, ''));

  const priceStr = $('.quote__close').text();
  const changeStr = $('.change__value').text();
  const percentStr = $('.change__percent').text();

  console.log('Price:', priceStr);
  console.log('Change:', changeStr);
  console.log('Percent:', percentStr);

  const price = cleanNum(priceStr);
  const change = cleanNum(changeStr);
  const changePercentage = cleanNum(percentStr);

  // Stats table
  const stats = {};
  $('.stats_item').each((i, el) => {
    const label = $(el).find('.stats_label').text().trim();
    const value = $(el).find('.stats_value').text().trim();
    if(label) stats[label] = value;
  });

  console.log(stats);
}

test();
