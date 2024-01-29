const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const hashPassword = bcrypt.hashSync("123456", 10);

const teacherData = [
  {
    firstName: "Andy",
    t_code: "t001",
    email: "andy@gmail.com",
    password: hashPassword,
  },
  {
    firstName: "Bobby",
    t_code: "t002",
    email: "bobby@gmail.com",
    password: hashPassword,
  },
  {
    firstName: "Sandy",
    t_code: "t003",
    email: "sandy@gmail.com",
    password: hashPassword,
  },
  {
    firstName: "Minny",
    t_code: "t004",
    email: "minny@gmail.com",
    password: hashPassword,
  },
];

const subjectData = [
  { title: "HTML", description: "Write webpage" },
  { title: "CSS", description: "Style webpage" },
  { title: "JS", description: "Dynamic webpage" },
];

async function run() {
  await prisma.teacher.createMany({ data: teacherData });
  await prisma.subject.createMany({ data: subjectData });
}
run();
