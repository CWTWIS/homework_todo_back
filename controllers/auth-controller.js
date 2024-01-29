const db = require("../models/db");
const bcrypt = require("bcryptjs");

const tryCatch = (func) => (req, res, next) => func(req, res, next).catch(next);
// promise ==> .then, .catch, .finally
exports.register = tryCatch(async (req, res, next) => {
  const { s_code, password, confirmPassword, firstName, email } = req.body;
  //   validation: JOI
  if (!(s_code && password && confirmPassword && firstName)) {
    return next(new Error("please fill in every input::400"));
  }
  if (password !== confirmPassword) {
    throw new Error("password and  confirm password is not match");
  }
  const { confirmPassword: cfpw, ...data } = req.body;
  data.password = await bcrypt.hash(data.password, 10);
  const newStudent = await db.student.create({ data });
  // db.student.create({ data: data });
  res.json({ message: "register successful" });
});
exports.login = (req, res, next) => {};
