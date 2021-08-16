DROP TABLE IF EXISTS renters;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS items;

CREATE TABLE renters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  hourly_wages NUMERIC(5, 2) NOT NULL,
  hours_working INT NOT NULL,
  dog_count INT,
  cat_count INT, 
  share INT NOT NULL
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  rent INT NOT NULL,
  summary TEXT,
  bedrooms INT NOT NULL,
  bathrooms NUMERIC(2, 1) NOT NULL,
  size INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  dog_deposit INT NOT NULL,
  cat_deposit INT NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost NUMERIC(6, 2) NOT NULL,
  amount INT NOT NULL
);

CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  reporter_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  group_code VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL,
  is_host BOOLEAN NOT NULL
);