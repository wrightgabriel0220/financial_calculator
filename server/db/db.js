const { Client } = require('pg');
const config = require('./../../config.js');

const client = new Client({
  host: config.db.host,
  user: config.db.user,
  password: config.db.pass,
  database:  config.db.name,
  port: config.db.port
});
client.connect()
  .then(result => {
    console.log('Succesfully connected to Postgres database');
  })
  .catch(err => {
    console.error(err);
  });

const getAllRenterData = () => {
  return client.query('SELECT * FROM renters')
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    })
};



module.exports = { getAllRenterData };