const express = require("express");
const recordRouter = require("./Records");

const router = express.Router();

 router.use("/", recordRouter);

 module.exports = router;