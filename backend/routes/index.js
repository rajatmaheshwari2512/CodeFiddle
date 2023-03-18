const express = require("express");
const router = express.Router();
const uuid4 = require("uuid4");
const path = require("path");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

/* GET home page. */
router.get("/", function (req, res, next) {
  const id = uuid4();
  fs.mkdir(path.resolve(`${__dirname}/playgrounds/${id}`), (err) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    } else {
      exec("npm create vite@latest -- --template react")
        .then((resp) => {
          res.json({ playgroundId: id });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: err });
        });
    }
  });
});

module.exports = router;
