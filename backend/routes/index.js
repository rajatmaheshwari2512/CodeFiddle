const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const uuid4 = require("uuid4");
const directoryTree = require("directory-tree");

router
  .get("/", function (req, res, next) {
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
  })
  .get("/tree/:playgroundId", (req, res) => {
    const playgroundId = req.params.playgroundId;
    const playGroundPath = path.resolve(
      `__dirname/playgrounds/${playgroundId}`
    );
    const tree = directoryTree(playGroundPath);
    res.json(tree);
  });

module.exports = router;
