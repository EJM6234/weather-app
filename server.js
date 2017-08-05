var express = require("express"),
    app = express(),
    PORT = process.env.PORT || 3000;

app.use(express.static("./public"))

app.listen(PORT, function () {
  console.log("Listening on: ", PORT);
});

app.get("/", function (req, res) {
  res.sendFile("index.html");
});