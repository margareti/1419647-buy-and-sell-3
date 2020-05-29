'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const http = require(`http`);
const chalk = require(`chalk`);
const {DEFAULT_PORT, HTTP_SUCCESS_CODE, NOT_FOUND_CODE} = require(`../constants`);

const MOCKS_PATH = `../../mock.json`;

const readMocks = async () => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, MOCKS_PATH), `utf-8`);
    return content;
  } catch (err) {
    return null;
  }
};
const buildResponse = async () => {
  const mocks = await readMocks();
  if (!mocks) {
    return null;
  }
  return JSON.parse(mocks).map((item) => `<ul><li>${item.title}</li></ul>`).join(``);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`: {
      const titles = await buildResponse();

      if (!titles) {
        res.writeHead(NOT_FOUND_CODE, {
          'Content-Type': `text/plain; charset=UTF-8`,
        });
        res.end(`Not found`);
        break;
      }
      res.writeHead(HTTP_SUCCESS_CODE, {
        'Content-Type': `text/html; charset=UTF-8`,
      });
      res.end(titles);
      break;
    }
  }
};

const start = (port = DEFAULT_PORT) => {
  const httpServer = http.createServer(onClientConnect);

  httpServer.listen(port, (err) => {
    if (err) {
      return chalk.red(console.error(`Server error ${err}`));
    }
    return chalk.blue(console.info(`Listening on port ${port}`));
  });
};

module.exports = {
  start,
};
