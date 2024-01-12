const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('userId');

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

   
    req.userId = decoded.id;

 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
