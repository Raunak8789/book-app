const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Received token:', token);
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'raunak'); // Use your actual secret key
      console.log('Decoded token:', decoded); // Add this line to log the decoded token
      req.userId = decoded.userId; // Set the user ID in the request
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'tokenwrong' });
    }
  };
  
  module.exports = authenticateUser;
  