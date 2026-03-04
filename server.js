require('dotenv').config();
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected...");

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running in ${process.env.NODE_ENV || "development"} on port ${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to DB, server is not starting.", error);
    process.exit(1);
  }
};

startServer();
