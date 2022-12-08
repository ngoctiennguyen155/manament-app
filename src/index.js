const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
// app.use(cors);
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
