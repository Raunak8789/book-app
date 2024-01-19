const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateUser = require('./authMiddleware');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user-profile', authenticateUser);

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Raunak1*$&',
  database: 'bookoperations',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const getUserSql = 'SELECT * FROM admin_details WHERE email = ? AND password = ?';
    db.query(getUserSql, [email, password], (getUserErr, getUserResult) => {
      if (getUserErr) {
        console.error(getUserErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (getUserResult.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = getUserResult[0];
      const token = jwt.sign({ userId: user.id }, 'raunak', { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/add-book', async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    // Check if any of the required fields are empty
    if (!title || !author || !genre) {
      return res.status(400).json({ error: 'Title, author, and genre are required fields' });
    }

    // Insert the book into the database
    const sql = 'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)';
    db.query(sql, [title, author, genre], (err) => {
      if (err) {
        console.error('Error adding new book', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('Book added to the database');
      res.status(201).json({ message: 'Book added successfully' });
    });
  } catch (error) {
    console.error('Error adding new book', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

app.delete('/delete-book/:id', (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Delete the book from the database
      const sql = 'DELETE FROM books WHERE id = ?';
      db.query(sql, [bookId], (err) => {
        if (err) throw err;
        console.log('Book deleted from the database');
        res.status(200).json({ message: 'Book deleted successfully' });
      });
    } catch (error) {
      console.error('Error deleting book', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/book-details/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    // Retrieve book details from the database based on the provided book ID
    const getBookDetailsSql = 'SELECT * FROM books WHERE id = ?';
    db.query(getBookDetailsSql, [bookId], (getBookDetailsErr, getBookDetailsResult) => {
      if (getBookDetailsErr) {
        console.error(getBookDetailsErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check if the book with the provided ID exists
      if (getBookDetailsResult.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const bookDetails = getBookDetailsResult[0];
      res.status(200).json(bookDetails);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update book details
app.put('/update-book/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, genre } = req.body;

    // Check if any of the required fields is missing
    if (!title || !author || !genre) {
      return res.status(400).json({ error: 'Title, author, and genre are required for update' });
    }

    // Update the book details in the database
    const updateBookSql = 'UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?';
    db.query(updateBookSql, [title, author, genre, bookId], (updateBookErr) => {
      if (updateBookErr) {
        console.error(updateBookErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(200).json({ message: 'Book updated successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/register', async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    // Check if the required fields are provided
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ error: 'Name, email, password, and gender are required' });
    }

    // Check if the email is unique
    const emailCheckSql = 'SELECT * FROM admin_details WHERE email = ?';
    db.query(emailCheckSql, [email], (emailCheckErr, emailCheckResult) => {
      if (emailCheckErr) {
        console.error(emailCheckErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (emailCheckResult.length > 0) {
        return res.status(409).json({ error: 'Email is already registered' });
      }

      // Insert the user into the database without hashing the password
      const insertUserSql = 'INSERT INTO admin_details (name, email, password, gender) VALUES (?, ?, ?, ?)';
      const sqlParams = [name, email, password, gender];
      console.log("SQL query:",insertUserSql , "Parameters:", sqlParams);
      db.query(insertUserSql, sqlParams, (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  app.get('/user-profile', async (req, res) => {
    try {
      // Retrieve user profile data from the database based on the authenticated user's ID
      const userId = req.userId; // Assuming you have a middleware to extract user ID from the request
      console.log('User ID:', userId);
  
      const getUserProfileSql = 'SELECT name, email, gender FROM admin_details WHERE id = ?';
      db.query(getUserProfileSql, [userId], (getUserProfileErr, getUserProfileResult) => {
        if (getUserProfileErr) {
          console.error(getUserProfileErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (getUserProfileResult.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const userProfile = getUserProfileResult[0];
        res.status(200).json(userProfile);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/books', async (req, res) => {
    try {
      const getBooksSql = 'SELECT * FROM books';
      db.query(getBooksSql, (getBooksErr, getBooksResult) => {
        if (getBooksErr) {
          console.error(getBooksErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(200).json(getBooksResult);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
