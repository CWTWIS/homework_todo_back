const db = require("../models/db");
const tryCatch = require("../utils/tryCatch");

exports.createHomework = tryCatch(async (req, res, next) => {
  const { question, startdate, duedate, published, subjectId } =
    //   validation
    req.body;
  console.log(req.body);
  if (req.user.role !== "teacher") {
    throw new Error("Unauthorized::400");
  }
  const rs = await db.homework.create({
    data: {
      subjectId: +subjectId,
      question,
      startdate,
      // startdate: new Date(startdate),
      duedate,
      // duedate: new Date(duedate),
      published,
      teacherId: req.user.id,
    },
  });
  res.json({ result: rs });
});

exports.getByTeacher = tryCatch(async (req, res, next) => {
  const homework = await db.homework.findMany({
    where: { teacherId: req.user.id },
    include: {
      Subject: {
        select: { title: true },
      },
    },
  });
  res.json({ homework });
});

exports.update = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { question, startdate, duedate, published, subjectId } = req.body;
  const rs = await db.homework.update({
    where: { id: +id },
    data: {
      subjectId: +subjectId,
      question,
      startdate,
      duedate,
      published,
      teacherId: req.user.id,
    },
  });
  res.json({ result: rs });
});

exports.delete = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  await db.homework.delete({
    where: { id: +id },
  });
  res.json({ message: "Delete OK" });
});
