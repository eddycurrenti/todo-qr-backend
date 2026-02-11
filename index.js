require('dotenv').config();

const express = require("express");
const app = express();
const connectDB = require("./DB/DB");
app.use(express.json());
const PORT = process.env.PORT || 3000;
const tasker = require("./routes/task");
const qqr = require("./routes/qr");
const gpa = require("./routes/gpa");
const cgpa = require("./routes/cgpa"); 
connectDB();
const cors = require("cors");

app.use(cors());

app.use("/todo", tasker);
app.use("/qr", qqr);
app.use("/gpa1", gpa);
app.use("/cgpa1",cgpa);
app.listen(PORT, () => {
    console.log("server Running on 3000");
});