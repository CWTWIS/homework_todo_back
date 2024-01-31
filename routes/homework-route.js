const express = require("express");
const homeworkController = require("../controllers/homework-controller");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
router.post("/", authenticate, homeworkController.createHomework);
router.get("/", authenticate, homeworkController.getByTeacher);
router.put("/:id", authenticate, homeworkController.update);
router.delete("/:id", authenticate, homeworkController.delete);
module.exports = router;
