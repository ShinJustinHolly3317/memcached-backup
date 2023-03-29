const Memcahced = require('memcached');
const fs = require('fs');

const cache = new Memcahced('your-address:port');

const files = fs.readdirSync('./backup/').filter((item) => item.includes('json'));
console.log(files);

files.forEach((fileName) => {
  const rawContent = fs.readFileSync(`./backup/${fileName}`);
  const items = JSON.parse(rawContent.toString('utf8'));
  console.log('memcached set items amounts:', JSON.parse(rawContent.toString('utf8')).length);

  items.forEach((item) => {
    const ttl = item.s - Math.floor(Date.now() / 1000);
    cache.set(item.key, item.value, ttl, (err, result) => {
      if (err) console.log(err);
    });
  });
});
