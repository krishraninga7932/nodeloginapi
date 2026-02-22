const {tokenVerify}=require('../../utils/jwt')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = tokenVerify(token);

  if (!decoded || !decoded.role) {
    return res.status(401).json({ msg: "Invalid token" });
  }
 
  req.user = decoded;
  next();
};


const authorized = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
};
module.exports = { authMiddleware, authorized };
