const express = require("express");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/auth", require("./routes/auth"));

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
