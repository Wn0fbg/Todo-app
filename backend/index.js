import express from "express";

const app = express();

app.get("/about", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
