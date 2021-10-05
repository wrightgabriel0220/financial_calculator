const { Client } = require('pg');
const config = require('../../config.js');

const client = new Client({
  host: config.db.host,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  port: config.db.port,
});
client.connect()
  .then(() => {
    console.log('Succesfully connected to Postgres database');
  })
  .catch(err => {
    console.error(err);
  });

const getDataFor = table => (
  client.query(`SELECT * FROM ${table}`)
    .then(result => result)
    .catch(err => err)
);

const getRentersForGroup = groupCode => {
  console.log(groupCode);
  const queryString = `SELECT renters.name, renters.hourly_wages, renters.hours_working, renters.dog_count, 
  renters.cat_count, renters.share FROM renters, users WHERE renters.name = users.first_name 
  AND users.group_code = '${groupCode}'`;
  return client.query(queryString)
    .then(result => result.rows)
    .catch(err => err);
};

const addRenter = data => {
  const queryString = `INSERT INTO renters (name, hourly_wages, hours_working, dog_count, cat_count, share, group_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const fields = [data.name, data.hourly, data.hours, data.dogs, data.cats, data.percentageShare, data.groupCode];
  return client.query(queryString, fields)
    .then(result => result)
    .catch(err => err);
};

const addListing = data => {
  const queryString = `INSERT INTO listings (address, rent, summary, bedrooms, bathrooms, size, city, dog_deposit, 
  cat_deposit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  const fields = [
    data.address,
    data.rent,
    data.summary,
    data.bedrooms,
    data.bathrooms,
    data.size,
    data.city,
    data.dogDeposit,
    data.catDeposit,
  ];
  return client.query(queryString, fields)
    .then(result => result)
    .catch(err => err);
};

const deleteRenter = id => (
  client.query('DELETE FROM renters WHERE (id = $1)', [id])
    .then(result => result)
    .catch(err => err)
);

const deleteListing = id => (
  client.query('DELETE FROM listings WHERE (id = $1)', [id])
    .then(result => result)
    .catch(err => err)
);

const reportIssue = issue => {
  const fields = [issue.description, issue.reporterName];
  return client.query('INSERT INTO issues (description, reporter_name) VALUES ($1, $2)', fields)
    .then(result => result)
    .catch(err => err);
};

const editRow = (table, id, column, value) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof (value) === 'string') { value = `'${value}'`; }
  return client.query(`UPDATE ${table} SET ${column} = ${value} WHERE (id = $1)`, [id])
    .then(result => result)
    .catch(err => err);
};

const registerUser = user => {
  const queryString = `INSERT INTO users (username, password, first_name, group_code, is_admin, is_host) 
  VALUES ($1, $2, $3, $4, $5, $6)`;
  const fields = [user.username, user.hashedPassword, user.firstName, user.groupCode, user.isAdmin, user.isHost];
  return client.query(queryString, fields)
    .then(result => result)
    .catch(err => err);
};

const getUserInfoFor = username => (
  client.query('SELECT * FROM users WHERE (username = $1)', [username])
    .then(result => result)
    .catch(err => err)
);

const getGroupCodes = () => (
  client.query('SELECT DISTINCT group_code FROM users;')
    .then(result => result)
    .catch(err => err)
);

module.exports = {
  getDataFor,
  getRentersForGroup,
  addRenter,
  addListing,
  deleteRenter,
  deleteListing,
  reportIssue,
  editRow,
  registerUser,
  getUserInfoFor,
  getGroupCodes,
};
