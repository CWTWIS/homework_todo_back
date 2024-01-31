const express = require("express");
const subjectRouter = require("../controllers/subject-controller");
const router = express.Router();

router.get("/", subjectRouter.getAll);
module.exports = router;
