const path = require('path');
const express = require('express');
const config = require('./../config.js');
const db = require('./db/db.js');

const app = express();
const port = '8080';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(config.root, 'client/dist')));

app.get('/renters', (req, res) => {
  db.getDataFor('renters').then(results => {
    res.send(results.rows);
  }).catch(err => {
    res.status(404);
    res.end(err);
  })
});

app.get('/listings', (req, res) => {
  db.getDataFor('listings').then(results => {
    res.send(results.rows);
  }).catch(err => {
    res.status(404);
    res.end(err);
  })
})

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
  console.log(req.body.id);
  db.deleteListing(req.body.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.put('/renters', (req, res) => {
  for (let column in req.body.updates) {
    db.editRow('renters', req.body.id, column, req.body.updates[column]).then(results => {
      res.send(results);
    }).catch(err => {
      res.status(500);
      res.end(err);
    })
  }
});

app.put('/listings', (req, res) => {
  db.editRow('listings', req.body.id, req.body.col, req.body.val).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.post('/issues', (req, res) => {
  db.reportIssue({ description: req.body.description, reporterName: req.body.renterName }).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  })
});

app.get("/*", (req, res) => {
  res.redirect('/');
})

app.listen(port, (err) => {
  console.log(`SERVER LISTENING AT PORT ${port}`);
})