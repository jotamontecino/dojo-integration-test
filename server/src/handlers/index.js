let handlers = {};

require('fs').readdirSync(`${__dirname}/`).forEach((file) => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const serviceHandlers = require(`./${file}`); // eslint-disable-line import/no-dynamic-require, global-require
    handlers = {
      ...handlers,
      ...serviceHandlers,
    };
  }
});

module.exports = handlers;
