const db = require("../models/db");
const tryCatch = require("../utils/tryCatch");

exports.createHomework = tryCatch(async (req, res, next) => {
  const { question, startdate, duedate, published, subjectId, teacherId } =
    //   validation
    req.body;
  console.log(req.body);
  if (req.user.role !== "teacher") {
    throw new Error("Unauthorized::400");
  }
  const rs = await db.homework.create({
    data: {
      subjectId,
      question,
      startdate: new Date(startdate),
      duedate: new Date(duedate),
      published,
      teacherId: req.user.id,
    },
  });
  res.json({ result: rs });
});
