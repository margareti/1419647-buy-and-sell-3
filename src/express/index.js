'use strict';

const express = require(`express`);
const path = require(`path`);

const DEFAULT_PORT = 8080;
const app = express();

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);
app.use(express.static(path.join(__dirname, './public')));

app.get(`/offers`, (req, res) => {
  res.render(`main--empty`);
});
app.get(`/search`, (req, res) => {
  res.render(`search-result`);
});
app.get(`/my`, (req, res) => {
  res.render(`my-tickets`);
});
app.get(`/login`, (req, res) => {
  res.render(`login`);
});
app.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});
app.get(`/`, (req, res) => {
  res.render(`index`);
});

app.listen(DEFAULT_PORT, () => {
  console.log(`App is listening on port ${DEFAULT_PORT}`);
});
