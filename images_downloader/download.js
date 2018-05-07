const fs = require('fs');
const request = require('request');

const download = (url, filename, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const URL = 'http://dima-hirurg.surge.sh/images';
const extension = 'jpg';
const FIRST_INDEX = 1;
const LAST_INDEX = 32;

for (let i = FIRST_INDEX; i <= LAST_INDEX; i++) {
    const title = `${i < 10 ? `0${i}` : i}.${extension}`;
    download(`${URL}/${i}.${extension}`, title, () => console.log(title));
};
