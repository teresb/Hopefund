const admin = (req, res, next) => {
   // Ensure that the user is authenticated and has a role of "admin"
   if (req.user && req.user.role === 'admin') {
     return next();
   }
   return res.status(403).json({ message: 'Access denied. Admins only.' });
 };
 
 module.exports = admin;
 