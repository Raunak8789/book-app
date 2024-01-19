-- Create a database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bookoperations;

-- Use the created database
USE bookoperations;

-- Create the admin_details table
CREATE TABLE IF NOT EXISTS admin_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL
);

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL
);
