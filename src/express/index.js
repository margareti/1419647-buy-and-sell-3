'use strict';

const express = require(`express`);
const offersRoute = require(`../routes/offers`);
const searchRoute = require(`../routes/search`);
const myRoute = require(`../routes/my`);
const loginRoute = require(`../routes/login`);
const registerRoute = require(`../routes/register`);
const homeRoute = require(`../routes/home`);

const DEFAULT_PORT = 8080;
const app = express();

app.use(`/offers`, offersRoute);
app.use(`/search`, searchRoute);
app.use(`/my`, myRoute);
app.use(`/login`, loginRoute);
app.use(`/register`, registerRoute);
app.use(`/`, homeRoute);

app.listen(DEFAULT_PORT, () => {
  console.log(`App is listening on port ${DEFAULT_PORT}`);
});
