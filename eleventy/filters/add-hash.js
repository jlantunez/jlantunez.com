const { readFile } = require('fs/promises');
const hasha = require('hasha');

const isProduction = process.env.NODE_ENV === 'production';
const pathAppend = isProduction ? 'https://jlantunez.com' : '';

module.exports = function addHashFilter(absolutePath, callback) {
  readFile(`_site/${absolutePath}`, { encoding: 'utf-8' })
    .then(content => hasha.async(content))
    .then(hash => {
      callback(null, `${pathAppend}${absolutePath}?hash=${hash.substr(0, 10)}`);
    })
    .catch(error => callback(error));
};
