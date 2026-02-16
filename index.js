require('dotenv').config();

const express = require("express");
const middleware = require("./auth");
const app = express();
const connectDB = require("./DB/DB");
app.use(express.json());
const PORT = process.env.PORT || 3000;
const tasker = require("./routes/task");
const qqr = require("./routes/qr");
const gpa = require("./routes/gpa");
const cgpa = require("./routes/cgpa");
const login = require("./routes/login");
const sign = require("./routes/createUser");
const leetcode = require("./routes/leetCodeStore");
const projects = require("./routes/project");
connectDB();
const cors = require("cors");

app.use(cors());
app.use(express.static("frontend"));

app.use("/todo",middleware,tasker);
app.use("/qr",middleware, qqr);
app.use("/gpa1",middleware, gpa);
app.use("/cgpa1",middleware,cgpa);
app.use("/signin",sign);
app.use("/login1",login);
app.use("/leetcode",leetcode);
app.use("/project",projects);

app.listen(PORT, () => {
    console.log("server Running on 3000");
});