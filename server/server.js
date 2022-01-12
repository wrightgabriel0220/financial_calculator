const path = require('path');
const express = require('express');
const config = require('../config.js');
const db = require('./db/db.js');

const app = express();
const port = '8080';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(config.root, 'client/dist')));

app.post('/renters/get', (req, res) => {
  db.getRentersForGroup(req.body.groupCode).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(404);
    res.end(err);
  });
});

app.get('/listings', (req, res) => {
  db.getDataFor('listings').then(results => {
    res.send(results.rows);
  }).catch(err => {
    res.status(404);
    res.end(err);
  });
});

app.post('/renters', (req, res) => {
  db.addRenter(req.body).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.post('/listings', (req, res) => {
  db.addListing(req.body).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.delete('/renters', (req, res) => {
  db.deleteRenter(req.body.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.delete('/listings', (req, res) => {
  db.deleteListing(req.body.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.put('/renters', (req, res) => {
  for (const column in req.body.updates) {
    if (Object.prototype.hasOwnProperty.call(req.body.updates, column)) {
      db.editRow('renters', req.body.id, column, req.body.updates[column]).then(results => {
        res.send(results);
      }).catch(err => {
        res.status(500);
        res.end(err);
      });
    }
  }
});

app.put('/listings', (req, res) => {
  db.editRow('listings', req.body.id, req.body.col, req.body.val).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.post('/issues', (req, res) => {
  db.reportIssue({ description: req.body.description, reporterName: req.body.renterName }).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.get('/users', (req, res) => {
  db.getDataFor('users').then(results => {
    res.send(results.rows);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.get('/users/:username', (req, res) => {
  db.getUserInfoFor(req.params.username).then(results => {
    console.log('results: ', results);
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.post('/users/register', (req, res) => {
  db.registerUser(req.body).then(results => {
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.put('/users/firstlog', (req, res) => {
  db.editRow('users', req.body.userId, 'has_logged_once', 'true').then(results => {
    console.log(results);
    res.send(results);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.get('/groupcodes', (req, res) => {
  db.getGroupCodes().then(groupCodes => {
    res.send(groupCodes.rows);
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.get('/expenses/:userId', (req, res) => {
  db.getDataFor('expenses').then(expenseList => {
    res.send(expenseList.rows.filter(expense => expense.user_id === Number(req.params.userId)));
  }).catch(err => {
    res.status(500);
    res.end(err);
  });
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(port, (err) => {
  if (err) { throw err; }
  // eslint-disable-next-line no-console
  console.log(`SERVER LISTENING AT PORT ${port}`);
});
