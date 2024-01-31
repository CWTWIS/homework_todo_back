const express = require("express");
const homeworkController = require("../controllers/homework-controller");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
router.post("/", authenticate, homeworkController.createHomework);
module.exports = router;
