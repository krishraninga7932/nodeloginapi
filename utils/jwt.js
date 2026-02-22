const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  let token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1d" });

  console.log("Token", token);

  return token;
}; 

const tokenVerify = (token) => {
  try {
    let decode=jwt.verify(token,process.env.JWTSECRET)
    return decode
  } catch (err) {
    console.log("Err", err.message);
    return err.message;
  }
};

module.exports = { generateToken, tokenVerify };
