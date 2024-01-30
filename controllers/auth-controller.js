const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

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

exports.login = tryCatch(async (req, res, next) => {
  const { t_code, s_code, password } = req.body;
  console.log(req.body);
  if (s_code && t_code) {
    throw new Error("Teacher or student::400");
  }
  if (s_code && !/^[s]\d{3}$/.test(s_code)) {
    throw new Error("Wrong format ID");
  }
  if (t_code && !/^[t]\d{3}$/.test(t_code)) {
    throw new Error("Wrong format ID");
  }
  const result = t_code
    ? await db.teacher.findFirstOrThrow({ where: { t_code } })
    : await db.student.findFirstOrThrow({ where: { s_code } });
  let pwOk = await bcrypt.compare(password, result.password);
  // promise.all
  if (!pwOk) {
    throw new Error("Invalid login");
  }
  // create token
  const payload = t_code
    ? { id: result.id, t_code: result.t_code }
    : { id: result.id, s_code: result.s_code };
  const token = jwt.sign(payload, process.env.JWTSECRETKEY, {
    expiresIn: "30d",
  });

  res.json({ ...result, token });
});

exports.getMe = (req, res, next) => {
  res.json({ user: req.user });
};
