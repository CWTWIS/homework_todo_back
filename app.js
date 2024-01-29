require("dotenv").config();
// process.env.AAA = 999;
// console.log(process.env.AAA);
const express = require("express");
const cors = require("cors");
const notFound = require("./middleware/notFound");
const error = require("./middleware/error");
const authRouter = require("./routes/auth-route");

const app = express();

app.use(cors());
app.use(express.json());

// REST API SERVER
app.use("/auth", authRouter);

app.use(notFound);
app.use(error);

let port = process.env.PORT;
app.listen(port, () => console.log("serve is running on", port));
