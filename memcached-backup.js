const Memcahced = require('memcached');
const fs = require('fs');

const cache = new Memcahced('your-address:port');

cache.items((itemserr, data) => {
  // log error
  if (itemserr) console.log(itemserr);

  const keys = Object.keys(data[0]);
  keys.pop();

  keys.forEach((stats) => {
    // get a cachedump for each slabid and slab.number
    cache.cachedump(data[0].server, parseInt(stats, 10), 0, (
      cachedumperr,
      responseArr,
    ) => {
      // log error
      if (cachedumperr) console.log(cachedumperr);

      // dump the shizzle
      const responseArrLen = responseArr.length;

      if (!Array.isArray(responseArr)) {
        console.log('not array');
        responseArr = [responseArr];
      }
      const newRespArr = [];

      responseArr.forEach((resp) => {
        cache.get(`${resp.key}`, (geterr, value) => {
          resp.value = value;
          newRespArr.push(resp);
          if (newRespArr.length === responseArrLen) {
            console.log('Slab ID:', parseInt(stats, 10), '=>', newRespArr.length, responseArrLen);
            fs.writeFileSync(`./backup/memcached-data-${parseInt(stats, 10)}.json`, JSON.stringify(newRespArr));
          }
          if (geterr) console.log(geterr);
        });
      });
    });
  });
});
