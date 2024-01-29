module.exports = (err, req, res, next) => {
  // console.log(err.message.split("::"));
  let statusCode = err.message.split("::")[1] || 500;
  let statusMessage = err.message.split("::")[0];
  res.status(statusCode).json({ err: statusMessage });
};
