const path = require('path');
const express = require('express');
const config = require('./../config.js');
const db = require('./db/db.js');

const app = express();
const port = '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(config.root, 'client/dist')));

app.get('/', (req, res) => {
  res.sendFile('client/dist/index.html', { root: root });
});

app.get('/renters', (req, res) => {
  db.getDataFor('renters').then(results => {
    res.send(results);
  }).catch(err => {
    res.status(404);
    res.end(err);
  })
});

app.post('/renters', (req, res) => {
  db.addRenter(req.body).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.post('/listings', (req, res) => {
  db.addListing(req.body).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.delete('/renters', (req, res) => {
  db.deleteRenter(req.body.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.delete('/listings', (req, res) => {
  db.deleteListing(req.body.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.put('/renters', (req, res) => {
  db.editRenter(req.body.id, req.body.col, req.body.val).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
})

app.listen(port, (err) => {
  console.log(`SERVER LISTENING AT PORT ${port}`);
})