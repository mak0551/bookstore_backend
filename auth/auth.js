const jwt = require("jsonwebtoken");
const config = require("../config");
function basicAuth(req, res, next) {
  //read
  const authHeader = req.headers.authorization;

  // Ensure the authorization header exists and is properly formatted
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res
      .status(401)
      .send("Unauthorized: Missing or invalid authorization header");
  }

  const token = authHeader.split(" ");
  const credentialtoken = token[1];
  // decode
  const buf = Buffer.from(credentialtoken, "base64");
  const credentials = buf.toString();
  const credentialstokens = credentials.split(":");
  const [admin, password] = credentialstokens;
  //validate
  if (admin === "admin" && password === "password") {
    next();
  } else {
    res.status(401).send("unauthorised");
  }
}
function tokenAuth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const tokens = authorization.split(" ");
    const jwtToken = tokens[1];
    const decoded = jwt.verify(jwtToken, config.jwtsecret); // ab jwt kya karta token ku verify karta ye token decode toh kaise b hojata jwt.io pe ja k decode karle sakte magr verify karne secret key hona toh ya kya hora token decode hojara phir ye dkhra k ye token apan diye secret se bana nai bana ya nai
    console.log(decoded);
    req.decodedToken = decoded;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: Invalid token");
  }
}
function authoriseadmin(req, res, next) {
  const { role } = req.decodedToken;
  if (role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "unauthorised" });
  }
} //this middleware used only in some specific routes
module.exports = { basicAuth, tokenAuth, authoriseadmin };
