const express = require("express"); // requiring express
const app = express(); // assigning express to app
const mongoose = require("mongoose"); // requiring mongoose
const config = require("./config"); // importing database connection string
const bookroutes = require("./routes/bookroutes"); // requiring book routes
const { basicAuth, tokenAuth } = require("./auth/auth"); // requiring basicauth
const userroutes = require("./routes/userroutes"); // requiring user routes
const cors = require("cors"); // requiring cors policy

// middleware for handling CORS policy here we have 2 options
// 1st option allows all origins with default of cors(*) // aur ye hamesha routes k upper rehna re bhai nai toh bulle miljate
app.use(cors());
// 2nd option allow custom origins, it is better because we can have controls
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(express.json()); // body parsar
app.use(express.urlencoded({ extended: true })); // body parsar

// public routes
app.use("/api/v1/users", userroutes);

// app.use(basicAuth);
app.use(tokenAuth);

// private routes
app.use("/api/v1/books", bookroutes); // getting routes

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("app listening on port 3000!"));

//ya se mongodb ka kaam shuru
mongoose
  .connect(config.dbconstr)
  .then(() => console.log("app connected"))
  .catch((error) => console.log("error connecting database"));
