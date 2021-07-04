const path = require('path');
const express = require('express');
const config = require('./../config.js');

const app = express();
const port = '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(config.root, 'client/dist')));

app.get('/', (req, res) => {
  res.sendFile('client/dist/index.html', { root: root });
})

app.listen(port, (err) => {
  console.log(`SERVER LISTENING AT PORT ${port}`);
})