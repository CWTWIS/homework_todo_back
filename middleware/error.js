module.exports = (err, req, res, next) => {
  // console.log(err.message.split("::"));
  let statusMessage = err.message.split("::")[0];
  let statusCode = err.message.split("::")[1] || 500;
  statusCode = err.message.includes("found") ? 400 : statusCode;
  res.status(statusCode).json({ err: statusMessage });
};
