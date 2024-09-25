const express = require("express"); // requiring express
const app = express(); // assigning express to app
const mongoose = require("mongoose"); // requiring mongoose
const bookroutes = require("./routes/bookroutes"); // requiring book routes
const { basicAuth, tokenAuth } = require("./auth/auth"); // requiring basicauth
const userroutes = require("./routes/userroutes"); // requiring user routes
const cors = require("cors"); // requiring cors policy

const mongodburl =
  "mongodb+srv://Afrozmak:vpgvp2yo@book-store-mern.kzsdodz.mongodb.net/book-connection?retryWrites=true&w=majority&appName=Book-Store-Mern"; // ye mongoose ki link hai

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

app.get("/", (req, res) => {
  console.log("home");
  res.send("hi");
});

//ya se mongodb ka kaam shuru
mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("app connected");
    app.listen(3000, () => {
      console.log("app listening on port 3000!");
    });
  })
  .catch((error) => {
    console.log("error connecting database");
  });
