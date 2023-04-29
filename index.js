const mongoose = require("mongoose");
const app = require("./src/app");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined.");
  process.exit(1);
}

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log("Server is running on " + PORT);
    });
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });
