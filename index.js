const express = require("express");

const app = express();

app.use(logger);

app.get("/books", (req, res) => {
  res.send({ route: "/books" });
});

app.get("/libraries", checkPermission("librarian"), (req, res) => {
  res.send({ route: "/libraries", permission: req.permission });
});

app.get("/authors", checkPermission("authors"), (req, res) => {
  res.send({ route: "/authors", permission: req.permission });
});

function logger(req, res, next) {
  console.log(`Requested Path ${req.path}`);
  next();
}

function checkPermission(role) {
  return function permission(req, res, next) {
    if (role === "librarian") {
      req.permission = true;
      return next();
    }
    if (role === "authors") {
      req.permission = true;
      return next();
    }
  };
}

const port = 4000;
app.listen(port, () => {
  console.log("Listening at port 4000");
});
