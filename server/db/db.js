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

const getDataFor = table => {
  return client.query(`SELECT * FROM ${table}`)
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    })
};

const addRenter = data => {
  return client.query('INSERT INTO renters (name, hourly_wages, hours_working, dog_count, cat_count, share) VALUES ($1, $2, $3, $4, $5, $6)', [data.name, data.hourly, data.hours, data.dogs, data.cats, data.percentageShare])
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    })
}



module.exports = { getDataFor, addRenter };