const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Create Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

// Heroku Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) return console.log("Internal server error.");
  console.log(`Server started at port ${PORT}`);
});
